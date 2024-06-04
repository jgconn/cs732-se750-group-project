output "cloudfront_url" {
  value = aws_cloudfront_distribution.website_cdn.domain_name
}

output "domain_name" {
  value = aws_cloudfront_distribution.website_cdn.domain_name
}

output "domain_zone_id" {
  value = aws_cloudfront_distribution.website_cdn.hosted_zone_id
}