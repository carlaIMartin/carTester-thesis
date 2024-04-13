package com.diagnosis.cardoctor.controllerMongo;

import com.diagnosis.cardoctor.daoMongo.CodeDao;
import com.diagnosis.cardoctor.entityMongo.Codes;
import org.bson.types.Code;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;


@RestController
public class ScanController {

    @Autowired
    private CodeDao codeDao;

//    @PostMapping("/scanCodes")
//    public ResponseEntity<String> scanCodes() {
//        try {
//
//            String result = executePythonScript();
//            return ResponseEntity.ok(result); // Return the result from the script execution
//        } catch (IOException | InterruptedException e) {
//            e.printStackTrace();
//            return ResponseEntity.internalServerError().body("Error executing script: " + e.getMessage());
//        }
//    }

    @PostMapping("/scanCodes/{username}")
    public ResponseEntity<String> scanCodesUser(@PathVariable String username) {
        try {

            String result = executePythonScript(username);
            List<Codes> codes = codeDao.findAll();
            for (Codes code : codes) {
                if (code.getUsername().equals(username)) {
                    System.out.println("Code: " +code.getCommand() + " belongs to user: " + username);
                }
            }


            return ResponseEntity.ok(result); // Return the result from the script execution
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error executing script: " + e.getMessage());
        }
    }

    private String executePythonScript(String username) throws IOException, InterruptedException {
        ProcessBuilder processBuilder = new ProcessBuilder("D:/Anaconda3/python.exe", "D:\\LICENTA-CARDOCTOR\\scripts_backup\\scripts\\ok.py", username );
        Process process = processBuilder.start();
        StringBuilder output = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
        }

        try (BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {
            String line;
            if ((line = errorReader.readLine()) != null) {
                StringBuilder errorOutput = new StringBuilder();
                do {
                    errorOutput.append(line).append("\n");
                } while ((line = errorReader.readLine()) != null);
                return "Error: " + errorOutput.toString();
            }
        }

        int exitVal = process.waitFor();
        if (exitVal == 0) {
            return output.toString();
        } else {
            return "Script execution failed with exit code: " + exitVal;
        }
    }
}
