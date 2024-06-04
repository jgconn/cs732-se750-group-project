variable "instance_name" {
  description = "Name of the EC2 instance"
  type = string
}

variable "ami" {
  description = "ID of the EC2 instance AMI"
  type = string
}

variable "instance_type" {
  description = "Name of the EC2 instance type"
  type = string
}

variable "subnet_id" {
  description = "ID of the subnet"
  type = string
}

variable "security_group_id" {
  description = "ID of the security group"
  type = string
}