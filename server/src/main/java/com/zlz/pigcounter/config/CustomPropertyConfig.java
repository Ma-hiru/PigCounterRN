package com.zlz.pigcounter.config;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.env.PropertiesPropertySource;

import java.io.File;
import java.util.Properties;

@Configuration
public class CustomPropertyConfig implements InitializingBean {

    @Autowired
    private Environment env;

    @Override
    public void afterPropertiesSet() {
        MutablePropertySources propertySources = ((org.springframework.core.env.ConfigurableEnvironment) env).getPropertySources();
        Properties properties = new Properties();
        String projectRoot =System.getProperty("user.dir");
        File projectRootDir = new File(projectRoot);
        File parentDir = projectRootDir.getParentFile();

        //将键"working.dir"与值 parentDir.getAbsolutePath()存入Properties对象中。
        properties.setProperty("working.dir", parentDir.getAbsolutePath().replace("\\","/"));
        propertySources.addFirst(new PropertiesPropertySource("customProperties", properties));
    }
}