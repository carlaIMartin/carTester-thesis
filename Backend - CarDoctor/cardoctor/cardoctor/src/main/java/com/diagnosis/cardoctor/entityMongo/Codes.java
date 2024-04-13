package com.diagnosis.cardoctor.entityMongo;

import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "codes")
@Data
public class Codes {
    @Id
    private String id;
    private String command;
    private String response_code;
    private String description;
    private Date timestamp;
    private String type;
    private Boolean problem;
    private String username;


//    @Getter
//    @Transient
//    private String codeCategory;

    public void updateCode(Codes newCode) {
        if (newCode.getCommand() != null) {
            this.command = newCode.getCommand();
        }
        if (newCode.getResponse_code() != null) {
            this.response_code = newCode.getResponse_code();
        }
        if (newCode.getDescription() != null) {
            this.description = newCode.getDescription();
        }
        if (newCode.getTimestamp() != null) {
            this.timestamp = newCode.getTimestamp();
        }
        if (newCode.getType() != null) {
            this.type = newCode.getType();
        }
        if (newCode.getProblem() != null) {
            this.problem = newCode.getProblem();
        }
        if (newCode.getUsername() != null) {
            this.username = newCode.getUsername();
        }


    }




//    public void setCodeCategory(String codeCategory) {
//        this.codeCategory = codeCategory;
//    }

}
