output "vpc_id" {
  value = aws_vpc.vpc.id
}

output "vpc_subnet_id1" {
  value = aws_subnet.public_subnet1.id
}

output "vpc_subnet_id2" {
  value = aws_subnet.public_subnet2.id
}