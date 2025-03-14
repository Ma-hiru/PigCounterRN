package Common.pojo.entity;

import lombok.Data;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class Employee {
    private Long id;
    @NotNull(message = "用户名不能为空")
    private String username;

    @NotNull(message = "密码不能为空")
    @Size(min = 8,message = "密码长度不能小于8")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",message = "密码必须包含大小写字母和数字")
    private String password;

    @NotNull(message = "姓名不能为空")
    private String name;

    @NotNull(message = "性别不能为空")
    private String sex;

    private String phone;

    private String createTime;

    private String profilePicture;
}
