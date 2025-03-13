package com.zlz.pigcounter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement

public class PigCounterApplication {

    public static void main(String[] args) {
        SpringApplication.run(PigCounterApplication.class, args);
    }

}
