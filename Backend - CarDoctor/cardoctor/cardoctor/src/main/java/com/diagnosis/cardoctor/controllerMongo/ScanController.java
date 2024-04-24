package com.diagnosis.cardoctor.controllerMongo;

import com.diagnosis.cardoctor.daoMongo.CodeDao;
import com.diagnosis.cardoctor.entityMongo.Codes;
import com.fasterxml.jackson.annotation.JsonIgnoreType;
import org.bson.types.Code;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

//import com.diagnosis.cardoctor.service.ScanService;


@RestController
public class ScanController {
int check = 1;
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

//    @PostMapping("/deleteCode/{orderNumber}")
//    public ResponseEntity<String> deleteCode(@PathVariable int orderNumber) {
//        try {
//            codeDao.deleteByOrderNumber(orderNumber);
//            return ResponseEntity.ok("Code with order number " + orderNumber + " deleted successfully.");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.internalServerError().body("Error deleting code: " + e.getMessage());
//        }
//    }

    @PostMapping("/deleteById/{id}")
    public ResponseEntity<String> deleteById(@PathVariable String id)
    {
        try {
            codeDao.deleteById(id);
            return ResponseEntity.ok("Code with id " + id + " deleted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error deleting code: " + e.getMessage());
        }
    }
    @PostMapping("/scanCodes/{username}")
    public ResponseEntity<String> scanCodesUser(@PathVariable String username) {
        try {
            // Execute Python script
            String result = executePythonScript(username);

            // Find all codes for the given username
            List<Codes> codes = codeDao.findAllByUsername(username);

            // Map to store codes grouped by the 'command' attribute
            Map<String, List<Codes>> commandMap = new HashMap<>();

            // Group codes by command attribute
            for (Codes code : codes) {
                commandMap.computeIfAbsent(code.getCommand(), k -> new ArrayList<>()).add(code);
            }


            for (Map.Entry<String, List<Codes>> entry : commandMap.entrySet()) {
                List<Codes> codeList = entry.getValue();
                // Sort codes by order number to ensure the correct sequence
                codeList.sort(Comparator.comparingInt(Codes::getOrderNumber));


                for (int i = 0; i < codeList.size(); i++) {
                    codeList.get(i).setOrderNumber(i + 1);  // Start from 1 and increment sequentially
                }
            }


            for (Codes code : codes) {
                codeDao.save(code);
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
