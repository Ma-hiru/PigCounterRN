package com.zlz.pigcounter;

import com.common.properties.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
@EnableCaching
@EnableConfigurationProperties(JwtProperties.class)

public class PigCounterApplication {

    public static void main(String[] args) {
        SpringApplication.run(PigCounterApplication.class, args);
    }

}
