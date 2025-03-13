package com.embryolisse.skincare.service;

import java.nio.file.*;
import java.util.Base64;
import java.io.*;

public class KeystoreUtil {

    public static void saveKeystoreFromEnv(String base64Keystore) throws IOException {
        // Decode the base64 keystore data
        byte[] decodedBytes = Base64.getDecoder().decode(base64Keystore);

        // Define the path where the keystore should be saved
        Path keystorePath = Paths.get("/app/keystore/my-release-key.p12");

        // Ensure the directory exists
        Files.createDirectories(keystorePath.getParent());

        // Write the decoded bytes to the file
        Files.write(keystorePath, decodedBytes);
    }
}