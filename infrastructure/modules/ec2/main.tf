resource "aws_instance" "se750_instance" {
  ami                         = var.ami
  instance_type               = var.instance_type
  subnet_id                   = var.subnet_id
  associate_public_ip_address = true
  vpc_security_group_ids      = [var.security_group_id]
  user_data = file("${path.module}/init.sh")
  tags = {
    Name = var.instance_name
  }
}