package Common.pojo.entity;

import lombok.Data;

@Data
public class Employee {
    private Long id;
    private String username;
    private String password;
    private String name;
    private String sex;
    private String phone;
    private String createTime;
}
