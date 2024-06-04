data "aws_cloudfront_origin_request_policy" "this" {
  name = "Managed-AllViewer"
}

data "aws_cloudfront_cache_policy" "this" {
  name = "Managed-CachingOptimized"
}

resource "aws_cloudfront_origin_access_control" "cloudfront_oac" {
  name                              = "${var.s3_name}-OAC"
  description                       = "The origin access control configuration for the Cloudfront distribution"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "website_cdn" {
  enabled = true

  origin {
    domain_name              = var.s3_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.cloudfront_oac.id
    origin_id                = "origin-bucket-${var.s3_id}"
  }

  origin {
    domain_name           = var.alb_dns_name
    origin_id             = "origin-alb-${var.alb_name}"
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  aliases = ["uoa-project.com"]

  default_root_object = var.website_suffix

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "DELETE", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    min_ttl                = "0"
    default_ttl            = "300"
    max_ttl                = "1200"
    target_origin_id       = "origin-bucket-${var.s3_id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  ordered_cache_behavior {
    path_pattern = "/api/*"
    allowed_methods        = ["GET", "HEAD", "DELETE", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    cache_policy_id = data.aws_cloudfront_cache_policy.this.id
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.this.id
    target_origin_id       = "origin-alb-${var.alb_name}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

  }

  custom_error_response {
    error_code             = 403
    response_code          = 200
    response_page_path     = "/"
    error_caching_min_ttl  = 60
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    acm_certificate_arn = var.acm_certificate_arn
    ssl_support_method = "sni-only"
  }
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  depends_on = [ aws_cloudfront_distribution.website_cdn ]
  bucket = var.s3_id
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "AllowCloudFrontServicePrincipalReadOnly",
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "cloudfront.amazonaws.com"
        },
        "Action" : "s3:GetObject",
        "Resource" : "${var.s3_arn}/*",
        "Condition" : {
          "StringEquals" : {
            "AWS:SourceArn" : "${aws_cloudfront_distribution.website_cdn.arn}"
          }
        }
      }
    ]
  })
}