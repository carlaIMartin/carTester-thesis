package com.diagnosis.cardoctor.controllerMongo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@RestController
public class ScanController {


    @PostMapping("/scanCodes")
    public ResponseEntity<String> scanCodes() {
        try {

            String result = executePythonScript();
            return ResponseEntity.ok(result); // Return the result from the script execution
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error executing script: " + e.getMessage());
        }
    }

    private String executePythonScript() throws IOException, InterruptedException {
        ProcessBuilder processBuilder = new ProcessBuilder("D:/Anaconda3/python.exe", "d:/LICENTA/scripts_backup/scripts/ok.py");
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
