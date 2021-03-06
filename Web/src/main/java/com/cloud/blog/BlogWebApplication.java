package com.cloud.blog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import springfox.documentation.oas.annotations.EnableOpenApi;

/**
 * @author yujunhong
 * @date 2021/5/26 15:24
 */
@SpringBootApplication(scanBasePackages = {"com.blog.config", "com.cloud.blog", "com.blog" +
        ".business.web", "com.blog.business.utils"})
@EnableDiscoveryClient
@EnableTransactionManagement
@EnableOpenApi
@EnableFeignClients("com.blog.feign")
public class BlogWebApplication {
    public static void main(String[] args) {
        SpringApplication.run(BlogWebApplication.class);
    }
}
