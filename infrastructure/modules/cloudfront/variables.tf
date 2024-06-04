variable "s3_name" {
  description = "Name of the S3 bucket"
  type = string
}

variable "s3_arn" {
  description = "ARN of the S3 bucket"
  type = string
}

variable "s3_id" {
  description = "ID of the s3 bucket"
  type = string
}

variable "s3_domain_name" {
  description = "Domain Name of the S3 bucket"
  type = string
}

variable "website_suffix" {
  description = "Name of the file for website suffix"
  type        = string
}

variable "acm_certificate_arn" {
  description = "value"
  type = string
}

variable "alb_name" {
  description = "value"
  type = string
}

variable "alb_dns_name" {
  description = "value"
  type = string
}