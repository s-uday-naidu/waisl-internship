package com.WARApp.Controller;

import com.WARApp.Model.CCTV1;
import com.WARApp.Repository.CCTV1Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.InetAddress;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v12/cctv1")
public class CCTV1Controller {

    @Autowired
    private CCTV1Repository cctv1Repository;

    @Autowired
    private JavaMailSender emailSender;
    @GetMapping
    public List<CCTV1> getAllCCTVS(){
        return cctv1Repository.findAll();
    }

    @GetMapping("/ping-cameras")
    public PingSummary pingCameras() {
        List<CCTV1> cctv1List = cctv1Repository.findAll();
        List<String> unresponsiveCameras = new ArrayList<>();
        List<String> unresponsiveHostnames = new ArrayList<>();

        for (CCTV1 cctv1 : cctv1List) {
            String ipAddress = cctv1.getIp_address();
            try {
                InetAddress inet = InetAddress.getByName(ipAddress);
                if (!inet.isReachable(5000)) { // Timeout in milliseconds
                    unresponsiveCameras.add(ipAddress);
                    unresponsiveHostnames.add(cctv1.getHost_name());
                }
            } catch (IOException e) {
                unresponsiveCameras.add(ipAddress);
                unresponsiveHostnames.add(cctv1.getHost_name());
            }
        }

        sendPingSummaryEmail(cctv1List.size(), unresponsiveCameras, unresponsiveHostnames);
        return new PingSummary(cctv1List.size(), unresponsiveCameras.size(), unresponsiveCameras, unresponsiveHostnames);
    }

    private void sendPingSummaryEmail(int totalCameras, List<String> unresponsiveCameras, List<String> unresponsiveHostnames) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("Uday.Sesharatnam@waisl.in");
        message.setSubject("CCTV Ping Summary");

        StringBuilder emailContent = new StringBuilder();
        emailContent.append("Total cameras: ").append(totalCameras).append("\n");
        emailContent.append("Cameras which didn't respond to ping: ").append(unresponsiveCameras.size()).append("\n");
        emailContent.append("List of IPs and their hostnames:\n");

        for (int i = 0; i < unresponsiveCameras.size(); i++) {
            emailContent.append(unresponsiveCameras.get(i)).append(" - ").append(unresponsiveHostnames.get(i)).append("\n");
        }

        message.setText(emailContent.toString());
        emailSender.send(message);
    }

    public static class PingSummary {
        private int totalCameras;
        private int unresponsiveCount;
        private List<String> unresponsiveIps;
        private List<String> unresponsiveHostnames;

        public PingSummary(int totalCameras, int unresponsiveCount, List<String> unresponsiveIps, List<String> unresponsiveHostnames) {
            this.totalCameras = totalCameras;
            this.unresponsiveCount = unresponsiveCount;
            this.unresponsiveIps = unresponsiveIps;
            this.unresponsiveHostnames = unresponsiveHostnames;
        }

        // Getters and Setters
    }
}
