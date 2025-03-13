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
        if (keystoreBase64 == null || keystoreBase64.isEmpty()) {
            System.err.println("Keystore Base64 is empty or null");
        } else {
            System.out.println("Keystore Base64 is set, attempting to save...");
            KeystoreUtil.saveKeystoreFromEnv(keystoreBase64);
        }
    }
}
