module "s3" {
  source         = "./modules/s3"
  bucket_name    = var.bucket_name
  website_suffix = var.website_suffix
}

module "cloudfront" {
  source              = "./modules/cloudfront"
  s3_name             = module.s3.s3_bucket
  s3_arn              = module.s3.s3_arn
  s3_id               = module.s3.s3_id
  s3_domain_name      = module.s3.s3_domain_name
  website_suffix      = var.website_suffix
  acm_certificate_arn = module.acm.acm_certificate_arn
  alb_dns_name        = module.alb.alb_dns_name
  alb_name            = var.alb_name
}

module "acm" {
  source           = "./modules/acm"
  route_53_zone_id = var.route_53_zone_id
}

module "vpc" {
  source             = "./modules/vpc"
  vpc_name           = var.vpc_name
  availability_zone1 = var.availability_zone1
  availability_zone2 = var.availability_zone2
}

module "security_group" {
  source              = "./modules/security_groups"
  security_group_name = var.security_group_name
  vpc_id              = module.vpc.vpc_id
}

module "ec2" {
  depends_on        = [module.security_group]
  source            = "./modules/ec2"
  instance_name     = var.instance_name
  instance_type     = var.instance_type
  ami               = var.ami
  subnet_id         = module.vpc.vpc_subnet_id1
  security_group_id = module.security_group.security_group_id
}

module "alb" {
  source              = "./modules/alb"
  alb_name            = var.alb_name
  security_group_id   = module.security_group.security_group_id
  instance_id         = module.ec2.ec2_instance_id
  instance_port       = var.instance_port
  vpc_id              = module.vpc.vpc_id
  subnet_id1          = module.vpc.vpc_subnet_id1
  subnet_id2          = module.vpc.vpc_subnet_id2
  acm_certificate_arn = module.acm.acm_certificate_arn
}

module "route53" {
  source               = "./modules/route53"
  route_53_domain_name = var.route_53_domain_name
  route_53_zone_id     = var.route_53_zone_id
  cdn_domain_name      = module.cloudfront.domain_name
  cdn_zone_id          = module.cloudfront.domain_zone_id
}