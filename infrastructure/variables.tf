variable "region" {
  description = "Name of the AWS region"
  type        = string
}

variable "bucket_name" {
  description = "Name of the S3 bucket"
  type        = string
}

variable "website_suffix" {
  description = "Name of the file for website suffix"
  type        = string
}

variable "availability_zone1" {
  description = "Name of the availability_zone"
  type        = string
}

variable "availability_zone2" {
  description = "Name of the availability_zone"
  type        = string
}

variable "vpc_name" {
  description = "Name of the virtual private network (VPC)"
  type        = string
}

variable "security_group_name" {
  description = "Name of the security group"
  type        = string
}

variable "instance_name" {
  description = "Name of the EC2 isntance"
  type        = string
}

variable "ami" {
  description = "ID of the EC2 instance ami"
  type        = string
}

variable "instance_type" {
  description = "Name of the EC2 instance type"
  type        = string
}

variable "alb_name" {
  description = "value"
  type        = string
}

variable "instance_port" {
  description = "value"
  type        = number
}

variable "route_53_domain_name" {
  description = "value"
  type        = string
}

variable "route_53_zone_id" {
  description = "value"
  type        = string
}