package com.zlz.pigcounter.interceptor;


import com.common.constant.JwtClaimsConstant;
import com.common.context.BaseContext;
import com.common.properties.JwtProperties;
import com.zlz.pigcounter.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * jwt令牌校验的拦截器
 */
@Component
@Slf4j
public class JwtTokenAdminInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtProperties jwtProperties;


    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 判断是否为预检请求（OPTIONS）
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            log.info("Pre-flight request detected, skipping JWT validation.");
            return true; // 直接放行预检请求
        }
        //判断当前拦截到的是Controller的方法还是其他资源
        if (!(handler instanceof HandlerMethod)) {
            //当前拦截到的不是动态方法，直接放行
            return true;
        }

        //从请求头中获取令牌
        String token = request.getHeader(jwtProperties.getAdminTokenName());

        //校验令牌
        try {
            log.info("jwt校验:{}", token);
            Claims claims = JwtUtil.parseJWT(jwtProperties.getAdminSecretKey(), token);
            Long empId = Long.valueOf(claims.get(JwtClaimsConstant.EMP_ID).toString());
            BaseContext.setCurrentId(empId);
            log.info("当前员工id：{}", empId);
            //通过，放行
            return true;
        } catch (ExpiredJwtException e) {
            throw e;
        } catch (Exception ex) {
            throw ex;
        }
    }
}
