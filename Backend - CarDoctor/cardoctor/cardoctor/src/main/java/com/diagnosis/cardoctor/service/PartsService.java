package com.diagnosis.cardoctor.service;

import com.diagnosis.cardoctor.daoMongo.CodeDao;
import com.diagnosis.cardoctor.entityMongo.Codes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

@Service
public class PartsService {

    @Autowired
    private CodeDao codeDao;

    public Object getObject() {
        Map<String, Object> object = new HashMap<>();
        object.put("key1", "value1");
        object.put("key2", "value2");
        return object;
    }



    public ResponseEntity<List<Map<String, Object>>> getRecommendedPartByUser(String command, String username) {
        List<Codes> codes = codeDao.findAll();
        List<Map<String, Object>> problems = new ArrayList<>();
        System.out.println("Command is " + command);
        Set<String> handledCommands = new HashSet<>();

        for (Codes code : codes) {
            if (code.getProblem() && code.getUsername().equals(username)) { // Check if the code has a problem and belongs to the user
                if (!handledCommands.contains(code.getCommand())) { // Process the command only if it hasn't been handled yet
                    Map<String, Object> problemDetails = new HashMap<>();
                    switch (code.getCommand()) {
                        case "FUEL_INJECT_TIMING":
                            if (Objects.equals(command, "FUEL_INJECT_TIMING")) {
                                List<String> valuesFit = Arrays.asList("Fuel pump", "Fuel filter", "Fuel pressure regulator", "Fuel tank", "Fuel lines", "Fuel injectors", "Fuel rail");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesFit);
                            }
                            break;
                        case "CATALYST_TEMP":
                            if (Objects.equals(command, "CATALYST_TEMP")) {
                                List<String> valuesCT = Arrays.asList("Catalytic converter", "Oxygen sensor", "Fuel injectors", "Fuel rail");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesCT);
                            }
                            break;
                        case "EGR_ERROR":
                            if (Objects.equals(command, "EGR_ERROR")) {
                                List<String> valuesEGR = Arrays.asList("EGR valve", "EGR cooler", "EGR pipe", "EGR sensor");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesEGR);
                            }
                            break;
                        case "RPM":
                            if (Objects.equals(command, "RPM")) {
                                List<String> valuesR = Arrays.asList("Crankshaft position sensor", "Camshaft position sensor", "Throttle position sensor", "Mass airflow sensor", "Engine control module");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesR);
                            }
                            break;
                        case "MONITOR_MISFIRE_CYLINDER_2":
                            if (Objects.equals(command, "MONITOR_MISFIRE_CYLINDER_2")) {
                                List<String> valuesMM2 = Arrays.asList("Spark plugs", "Ignition coils", "Fuel injectors", "Engine control module");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesMM2);
                            }
                            break;
                        case "ENGINE_LOAD":
                            if (Objects.equals(command, "ENGINE_LOAD")) {
                                List<String> valuesEL = Arrays.asList("Throttle position sensor", "Mass airflow sensor", "Engine control module");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesEL);
                            }
                            break;
                        case "COOLANT_TEMP":
                            if (Objects.equals(command, "COOLANT_TEMP")) {
                                List<String> valuesCT = Arrays.asList("Coolant temperature sensor", "Thermostat", "Radiator", "Cooling fan");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesCT);
                            }
                            break;
                        case "SHORT_FUEL_TRIM_1":
                            if (Objects.equals(command, "SHORT_FUEL_TRIM_1")) {
                                List<String> valuesSFT1 = Arrays.asList("Oxygen sensors", "Fuel injectors", "Mass airflow sensor");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesSFT1);
                            }
                            break;
                        case "LONG_FUEL_TRIM_1":
                            if (Objects.equals(command, "LONG_FUEL_TRIM_1")) {
                                List<String> valuesLFT1 = Arrays.asList("Oxygen sensors", "Fuel injectors", "Mass airflow sensor");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesLFT1);
                            }
                            break;
                        case "SPEED":
                            if (Objects.equals(command, "SPEED")) {
                                List<String> valuesS = Arrays.asList("Vehicle speed sensor", "ABS control module");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesS);
                            }
                            break;
                        case "TIMING_ADVANCE":
                            if (Objects.equals(command, "TIMING_ADVANCE")) {
                                List<String> valuesTA = Arrays.asList("Crankshaft position sensor", "Camshaft position sensor", "Ignition module");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesTA);
                            }
                            break;
                        case "INTAKE_TEMP":
                            if (Objects.equals(command, "INTAKE_TEMP")) {
                                List<String> valuesIT = Arrays.asList("Intake air temperature sensor", "Mass airflow sensor");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesIT);
                            }
                            break;
                        case "MAF":
                            if (Objects.equals(command, "MAF")) {
                                List<String> valuesMAF = Arrays.asList("Mass airflow sensor", "Air filter", "Intake manifold");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesMAF);
                            }
                            break;
                        case "THROTTLE_POS":
                            if (Objects.equals(command, "THROTTLE_POS")) {
                                List<String> valuesTP = Arrays.asList("Throttle position sensor", "Throttle body");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesTP);
                            }
                            break;
                        case "RUN_TIME":
                            if (Objects.equals(command, "RUN_TIME")) {
                                List<String> valuesRT = Arrays.asList("Engine control module", "Battery");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesRT);
                            }
                            break;
                        case "DISTANCE_SINCE_DTC_CLEAR":
                            if (Objects.equals(command, "DISTANCE_SINCE_DTC_CLEAR")) {
                                List<String> valuesDSDC = Arrays.asList("Odometer sensor", "Engine control module");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesDSDC);
                            }
                            break;
                        case "BAROMETRIC_PRESSURE":
                            if (Objects.equals(command, "BAROMETRIC_PRESSURE")) {
                                List<String> valuesBP = Arrays.asList("Barometric pressure sensor", "Engine control module");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesBP);
                            }
                            break;
                        case "O2_S1_WR_CURRENT":
                            if (Objects.equals(command, "O2_S1_WR_CURRENT")) {
                                List<String> valuesO2 = Arrays.asList("Oxygen sensor", "Wiring harness");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesO2);
                            }
                            break;
                        case "CATALYST_TEMP_B1S1":
                            if (Objects.equals(command, "CATALYST_TEMP_B1S1")) {
                                List<String> valuesCTB1S1 = Arrays.asList("Catalytic converter", "Oxygen sensor");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesCTB1S1);
                            }
                            break;
                        case "PIDS_C":
                            if (Objects.equals(command, "PIDS_C")) {
                                List<String> valuesPC = Arrays.asList("Diagnostic tool");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesPC);
                            }
                            break;
                        case "CONTROL_MODULE_VOLTAGE":
                            if (Objects.equals(command, "CONTROL_MODULE_VOLTAGE")) {
                                List<String> valuesCMV = Arrays.asList("Battery", "Alternator", "Engine control module");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesCMV);
                            }
                            break;
                        case "ABSOLUTE_LOAD":
                            if (Objects.equals(command, "ABSOLUTE_LOAD")) {
                                List<String> valuesAL = Arrays.asList("Throttle position sensor", "Mass airflow sensor", "Engine control module");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesAL);
                            }
                            break;
                        case "COMMANDED_EQUIV_RATIO":
                            if (Objects.equals(command, "COMMANDED_EQUIV_RATIO")) {
                                List<String> valuesCER = Arrays.asList("Fuel injectors", "Oxygen sensors", "Engine control module");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesCER);
                            }
                            break;
                        case "RELATIVE_THROTTLE_POS":
                            if (Objects.equals(command, "RELATIVE_THROTTLE_POS")) {
                                List<String> valuesRTP = Arrays.asList("Throttle position sensor");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesRTP);
                            }
                            break;
                        case "THROTTLE_ACTUATOR":
                            if (Objects.equals(command, "THROTTLE_ACTUATOR")) {
                                List<String> valuesTA = Arrays.asList("Throttle actuator", "Throttle body");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesTA);
                            }
                            break;
                        case "TIME_SINCE_DTC_CLEARED":
                            if (Objects.equals(command, "TIME_SINCE_DTC_CLEARED")) {
                                List<String> valuesTSDC = Arrays.asList("Engine control module", "Diagnostic tool");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesTSDC);
                            }
                            break;
                        case "DISTANCE_W_MIL":
                            if (Objects.equals(command, "DISTANCE_W_MIL")) {
                                List<String> valuesDWM = Arrays.asList("Odometer sensor", "Engine control module");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesDWM);
                            }
                            break;
                        case "FUEL_RAIL_PRESSURE_VAC":
                            if (Objects.equals(command, "FUEL_RAIL_PRESSURE_VAC")) {
                                List<String> valuesFRPV = Arrays.asList("Fuel pressure sensor", "Fuel rail", "Vacuum hose");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesFRPV);
                            }
                            break;
                        case "COMMANDED_EGR":
                            if (Objects.equals(command, "COMMANDED_EGR")) {
                                List<String> valuesCEGR = Arrays.asList("EGR valve", "EGR sensor", "EGR cooler");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesCEGR);
                            }
                            break;
                        case "EVAPORATIVE_PURGE":
                            if (Objects.equals(command, "EVAPORATIVE_PURGE")) {
                                List<String> valuesEP = Arrays.asList("Purge valve", "EVAP canister", "EVAP vent solenoid");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesEP);
                            }
                            break;
                        case "MONITOR_HEATED_CATALYST_B1":
                            if (Objects.equals(command, "MONITOR_HEATED_CATALYST_B1")) {
                                List<String> valuesMHCB1 = Arrays.asList("Catalytic converter", "Oxygen sensor", "Engine control module");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesMHCB1);
                            }
                            break;
                        case "INTAKE_PRESSURE":
                            if (Objects.equals(command, "INTAKE_PRESSURE")) {
                                List<String> valuesIP = Arrays.asList("Intake manifold", "Intake air temperature sensor", "Mass airflow sensor");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesIP);
                            }
                            break;
                        case "SHORT_FUEL_TRIM_2":
                            if (Objects.equals(command, "SHORT_FUEL_TRIM_2")) {
                                List<String> valuesSFT2 = Arrays.asList("Oxygen sensors (Bank 2)", "Fuel injectors (Bank 2)", "Mass airflow sensor", "Exhaust leaks");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesSFT2);
                            }
                            break;
                        case "LONG_FUEL_TRIM_2":
                            if (Objects.equals(command, "LONG_FUEL_TRIM_2")) {
                                List<String> valuesLFT2 = Arrays.asList("Oxygen sensors (Bank 2)", "Fuel injectors (Bank 2)", "Mass airflow sensor", "Exhaust leaks");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesLFT2);
                            }
                            break;
                        case "FUEL_PRESSURE":
                            if (Objects.equals(command, "FUEL_PRESSURE")) {
                                List<String> valuesFP = Arrays.asList("Fuel pump", "Fuel pressure regulator", "Fuel filter", "Fuel lines");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesFP);
                            }
                            break;
                        case "EVAP_VAPOR_PRESSURE":
                            if (Objects.equals(command, "EVAP_VAPOR_PRESSURE")) {
                                List<String> valuesEVP = Arrays.asList("EVAP pressure sensor", "EVAP canister", "Purge valve", "Vent solenoid");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesEVP);
                            }
                            break;
                        case "O2_B1S1":
                            if (Objects.equals(command, "O2_B1S1")) {
                                List<String> valuesO2B1S1 = Arrays.asList("Oxygen sensor Bank 1 Sensor 1 (upstream)");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesO2B1S1);
                            }
                            break;
                        case "O2_B1S2":
                            if (Objects.equals(command, "O2_B1S2")) {
                                List<String> valuesO2B1S2 = Arrays.asList("Oxygen sensor Bank 1 Sensor 2 (downstream)");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesO2B1S2);
                            }
                            break;
                        case "O2_B1S4":
                            if (Objects.equals(command, "O2_B1S4")) {
                                List<String> valuesO2B1S4 = Arrays.asList("Oxygen sensor Bank 1 Sensor 4");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesO2B1S4);
                            }
                            break;
                        case "O2_B2S1":
                            if (Objects.equals(command, "O2_B2S1")) {
                                List<String> valuesO2B2S1 = Arrays.asList("Oxygen sensor Bank 2 Sensor 1 (upstream)");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesO2B2S1);
                            }
                            break;
                        case "O2_B2S2":
                            if (Objects.equals(command, "O2_B2S2")) {
                                List<String> valuesO2B2S2 = Arrays.asList("Oxygen sensor Bank 2 Sensor 2 (downstream)");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesO2B2S2);
                            }
                            break;
                        case "O2_B2S3":
                            if (Objects.equals(command, "O2_B2S3")) {
                                List<String> valuesO2B2S3 = Arrays.asList("Oxygen sensor Bank 2 Sensor 3");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesO2B2S3);
                            }
                            break;
                        case "O2_B2S4":
                            if (Objects.equals(command, "O2_B2S4")) {
                                List<String> valuesO2B2S4 = Arrays.asList("Oxygen sensor Bank 2 Sensor 4");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesO2B2S4);
                            }
                            break;
                        case "AMBIANT_AIR_TEMP":
                            if (Objects.equals(command, "AMBIANT_AIR_TEMP")) {
                                List<String> valuesAAT = Arrays.asList("Ambient air temperature sensor");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesAAT);
                            }
                            break;
                        case "ACCELERATOR_POS_B":
                            if (Objects.equals(command, "ACCELERATOR_POS_B")) {
                                List<String> valuesAPB = Arrays.asList("Accelerator position sensor B");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesAPB);
                            }
                            break;
                        case "ACCELERATOR_POS_D":
                            if (Objects.equals(command, "ACCELERATOR_POS_D")) {
                                List<String> valuesAPD = Arrays.asList("Accelerator position sensor D");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesAPD);
                            }
                            break;
                        case "ACCELERATOR_POS_E":
                            if (Objects.equals(command, "ACCELERATOR_POS_E")) {
                                List<String> valuesAPE = Arrays.asList("Accelerator position sensor E");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesAPE);
                            }
                            break;
                        case "RUN_TIME_MIL":
                            if (Objects.equals(command, "RUN_TIME_MIL")) {
                                List<String> valuesRTM = Arrays.asList("Engine control module");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesRTM);
                            }
                            break;


// Continue with the format as needed for other response codes.



                    }
                    // Only add the problemDetails map to the problems list if it's not empty
                    if (!problemDetails.isEmpty()) {
                        problems.add(problemDetails);
                        handledCommands.add(code.getCommand()); // Mark this command as handled
                    }
                }
            }
        }
        if (problems.isEmpty()) {
            // If no codes with problems were found, return an appropriate response
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            // Return the list of problems, wrapped in a ResponseEntity
            return new ResponseEntity<>(problems, HttpStatus.OK);
        }
    }

    public String scrapeParts (String part, String carBrand) throws InterruptedException, IOException {
        ProcessBuilder processBuilder = new ProcessBuilder("D:/Anaconda3/python.exe", "D:\\LICENTA-CARDOCTOR\\scripts\\scrapingScript\\scrapeParts.py", part, carBrand );
        Process process = processBuilder.start();
        StringBuilder output = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
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
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        int exitVal = process.waitFor();
        if (exitVal == 0) {
            return output.toString();
        } else {
            return "Script execution failed with exit code: " + exitVal;
        }
    }
}
