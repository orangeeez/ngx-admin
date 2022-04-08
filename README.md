## Docker
### Development

Via **trainy**:
- docker-compose pull front
- docker-compose up -d

Via **Docker Hub**:
- docker pull orangeeez/trainy_front:latest
- docker run -d --rm \  
-v ${PWD}/dev/nginx-front.conf:/etc/nginx/nginx.conf \  
-p 4200:80 \  
--name trainy_front orangeeez/trainy_front:latest 

_**Linux**: $(pwd)_  
_**CMD**: %cd%_  
_**PowerShell**: ${PWD}_

_where [nginx-front.conf](https://github.com/asxcandrew/trainy/blob/24cbaf4d19c26766429245364086c3ebee755bc0/dev/nginx-front.conf) should be or not modified regarding  configuration_
