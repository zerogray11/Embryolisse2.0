package com.embryolisse.skincare.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class KeystoreLoader implements CommandLineRunner {

    @Value("${KEYSTORE_BASE64}")
    private String keystoreBase64;

    @Override
    public void run(String... args) throws Exception {
        // Call the method to decode and save the keystore
        KeystoreUtil.saveKeystoreFromEnv(keystoreBase64);
    }
}
