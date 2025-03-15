package Common.pojo.entity;

import Common.validation.EmployeeValidation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;




@Data
public class Employee {
    private Long id;
    @NotBlank(message = "用户名不能为空",groups = {EmployeeValidation.add.class})
    private String username;

    @NotBlank(message = "密码不能为空")
    @Size(min = 8,message = "密码长度不能小于8",groups = EmployeeValidation.update.class)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",message = "密码必须包含大小写字母和数字",groups = EmployeeValidation.update.class)
    private String password;

    @NotBlank(message = "姓名不能为空",groups = EmployeeValidation.update.class)
    private String name;

    @NotBlank(message = "性别不能为空",groups = EmployeeValidation.update.class)
    private String sex;

    private String phone;

    private String createTime;

    private String profilePicture;

    @NotBlank(message = "组织不能为空",groups = EmployeeValidation.update.class)
    private String organization;
}
