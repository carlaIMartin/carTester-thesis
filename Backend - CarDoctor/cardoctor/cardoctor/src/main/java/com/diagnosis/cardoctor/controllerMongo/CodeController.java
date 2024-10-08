package com.diagnosis.cardoctor.controllerMongo;

import com.diagnosis.cardoctor.daoMongo.CodeDao;
import com.diagnosis.cardoctor.daoMongo.UserCarsDao;
import com.diagnosis.cardoctor.entityMongo.Codes;
import com.diagnosis.cardoctor.entityMongo.UserCars;
import com.diagnosis.cardoctor.service.PartsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class CodeController {

    @Autowired
    private CodeDao codeDao;

    @Autowired
    private UserCarsDao UserCarsDao;

    int number;

    @Autowired
    private PartsService partsService;


    @GetMapping("/findAllNames")
    public List<Codes> getIgen() {

        // return codeCategories.getAllCodesWithTemporaryInfo();
        System.out.println(codeDao.findAllNames());
        return codeDao.findAllNames();

    }

    @GetMapping("/codeName/{name}")
    public Optional<Codes> getIgen2(@PathVariable String name) {

        // return codeCategories.getAllCodesWithTemporaryInfo();
        System.out.println(codeDao.findByCommand(name));
        return codeDao.findByCommand(name);

    }

    @GetMapping("codeByOrderAndUsername/{username}/{orderNumber}")
    public  List<Codes> getByOrderAndUsername(@PathVariable String username, @PathVariable int orderNumber) {
        return codeDao.findAllByUsernameAndOrderNumber(username, orderNumber);
    }



    @GetMapping("/codeTypeAndUser/{type}/{username}")
    public List<Codes> getTypeAndUser(@PathVariable String type, @PathVariable String username) {

        // return codeCategories.getAllCodesWithTemporaryInfo();
        System.out.println(codeDao.findByTypeAndUser(type, username));
        return codeDao.findByTypeAndUser(type, username);

    }

    @GetMapping("/getMaxNumber/{username}")
    public int getNumber(@PathVariable String username) {
        int number = 0;
        List<Codes> codes = codeDao.findAllByUsername(username);
        for(Codes code : codes)
        {
            if(number < code.getOrderNumber()){
                number = code.getOrderNumber();
            }
            System.out.println(code.getOrderNumber());

        }
        return number;


    }

    @GetMapping("/codeType/{type}")
    public List<Codes> getType(@PathVariable String type) {

        // return codeCategories.getAllCodesWithTemporaryInfo();
        System.out.println(codeDao.findByType(type));
        return codeDao.findByType(type);

    }


//    @GetMapping("/items/{name}")
//    public ResponseEntity<Codes> getItemByName(@PathVariable String name) {
//        return codeDao.findByCommand(name)
//                .map(ResponseEntity::ok) // if the item is found, return it
//                .orElseGet(() -> ResponseEntity.notFound().build()); // if not found, return 404
//    }


    @GetMapping("/codes")
    public List<Codes> getAllCodes() {


        return codeDao.findAll();
    }

@GetMapping("/codes/{username}")
    public List<Codes> getCodesByUsername(@PathVariable String username) {
        return codeDao.findAllByUsername(username);
    }
    @GetMapping("/codesPageable/{username}")
    public Page<Codes> getAllCodes(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @PathVariable String username) {
        Pageable pageable = PageRequest.of(page, size);
        return codeDao.findAllByUsernamePageable(username, pageable);
    }


    @GetMapping("/getCodeByCommand/{id}")
    public Optional<Codes> getCodeById(@PathVariable String id) {
        return codeDao.findById(id);
    }



//    @GetMapping("/getCodesByPart/{command}")
//    public ResponseEntity<List<Map<String, Object>>> getRecommendedPart(@PathVariable String command) {
//        return partsService.getRecommendedPart(command);
//
//    }
    @GetMapping("/getCodesByPartAndUser/{command}/{username}")
    public ResponseEntity<List<Map<String, Object>>> getRecommendedPart(@PathVariable String command, @PathVariable String username) {
        return partsService.getRecommendedPartByUser(command, username);
    }

    @GetMapping("/getCodesByCommandAndUser/{command}/{username}")
    public List<Codes> getCodesByCommandAndUser(@PathVariable String command, @PathVariable String username) {
        return codeDao.findByCommandAndUser(command, username);
    }

    @GetMapping("/scrapeParts/{part}/{carBrand}")
    public String scrapeParts(@PathVariable String part, @PathVariable String carBrand) throws IOException, InterruptedException {
        return partsService.scrapeParts(part, carBrand);
    }

    @GetMapping("/getCarByUsername/{username}")
    public List<UserCars> getCarByUsername(@PathVariable String username) {
        return UserCarsDao.findCarByUsername(username);
    }

}
