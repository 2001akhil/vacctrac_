
// #include <ESP8266WiFi.h>
// #include <ESP8266HTTPClient.h>
// #include <DHT.h>
// #define ARRAY_SIZE 5  // Adjust the array size as needed

// bool objectDetected = false;

// String init_state="";
// String saved_state="";
// #define DHTPIN 2     // DHT11 data pin is connected to GPIO2
// #define DHTTYPE DHT11   // DHT11 sensor is used
// DHT dht(DHTPIN, DHTTYPE);

// const char* ssid = "Galaxy A51 A4D9";
// const char* password = "app.listen";

// void setup() {
//   Serial.begin(115200);
//   delay(1000);

//   // Connect to Wi-Fi network
//   WiFi.begin(ssid, password);
//   Serial.println("");
//   Serial.println("Connecting to WiFi...");

//   while (WiFi.status() != WL_CONNECTED) {
//     delay(1000);
//     Serial.print(".");
//   }

//   Serial.println("");
//   Serial.println("WiFi connected");

//   // Initialize DHT sensor
//   dht.begin();
// }

// void loop() {

//   int ir_1 = 0;
//   int ir_2 = 0;
//   int ir_3=0;

//   // Wait a few seconds between measurements
//   delay(2000);

//   // Read temperature and humidity from DHT sensor
//   float temperature = dht.readTemperature();
//   float humidity = dht.readHumidity();
// Serial.print(temperature );
//   // Read IR sensor data
//   int ir1 = digitalRead(D7);
//   int ir2 = digitalRead(D1);

// if(ir1==1){
//   ir_1=0;
// }
// else{
//   ir_1=1;
// }

//   if (ir2 == 1) {
//     ir_2 = 0;
//   } else {
//     ir_2 = 1;

//   }

// if()

// Serial.println(ir_1);

//   // previosir1=ir_1;

//   //  if(previosir1!=ir_1){

//   //    ir_1=0;
//   //     Serial.println(ir_1);
//   //  }

//     saved_state=ir_1

//     WiFiClient client;
//     HTTPClient http;

//   String json = "{\"temperature\": \"" + String(temperature) + "\", \"IR1\": \"" + String(ir_1) + "\", \"IR2\": \"" + String(ir_2) + "\", \"IR3\": \"" + String(ir_3) + "\"}";

//     Serial.print("Sending HTTP POST request...");
//     if (http.begin(client, "http://192.168.157.41:3000/main/AWS01")) {//AWS01 machine name
//       http.addHeader("Content-Type", "application/json");
//       int httpCode = http.POST(json);
//       if (httpCode == 200) {
//         Serial.println("OK");
//        } else {
//         Serial.print("failed with error code ");
//         Serial.println(httpCode);
//         Serial.println("checking");
//       }
//       http.end();
//     } else {
//       Serial.println("failed to connect to server");
//     }
// }
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <DHT.h>
#define ARRAY_SIZE 5 // Adjust the array size as needed

bool objectDetected = false;

String init_state = "";
String saved_state = "";

#define DHTPIN 2      // DHT11 data pin is connected to GPIO2
#define DHTTYPE DHT11 // DHT11 sensor is used
DHT dht(DHTPIN, DHTTYPE);

const char *ssid = "Galaxy A51 A4D9";
const char *password = "app.listen";

void setup()
{
      Serial.begin(115200);
      delay(1000);

      // Connect to Wi-Fi network
      WiFi.begin(ssid, password);
      Serial.println("");
      Serial.println("Connecting to WiFi...");

      while (WiFi.status() != WL_CONNECTED)
      {
            delay(1000);
            Serial.print(".");
      }

      Serial.println("");
      Serial.println("WiFi connected");

      // Initialize DHT sensor
      dht.begin();
}

void loop()
{
      int ir_1 = 0;
      int ir_2 = 0;
      int ir_3 = 0;

      // Wait a few seconds between measurements
      delay(2000);

      // Read temperature and humidity from DHT sensor
      float temperature = dht.readTemperature();
      float humidity = dht.readHumidity();
      Serial.print(temperature);

      // Read IR sensor data
      int ir1 = digitalRead(D7);
      int ir2 = digitalRead(D1);

      if (ir1 == 1)
      {
            ir_1 = 0;
      }
      else
      {
            ir_1 = 1;
      }

      if (ir2 == 1)
      {
            ir_2 = 0;
      }
      else
      {
            ir_2 = 1;
      }

      String current_state = String(ir_1) + String(ir_2) + String(temperature);

      if (current_state != saved_state)
      {
            saved_state = current_state;

            WiFiClient client;
            HTTPClient http;

            String json = "{\"temperature\": \"" + String(temperature) + "\", \"IR1\": \"" + String(ir_1) + "\", \"IR2\": \"" + String(ir_2) + "\", \"IR3\": \"" + String(ir_3) + "\"}";

            Serial.print("Sending HTTP POST request...");
            if (http.begin(client, "http://192.168.157.41:3000/main/AWS01"))
            { // AWS01 machine name
                  http.addHeader("Content-Type", "application/json");
                  int httpCode = http.POST(json);
                  if (httpCode == 200)
                  {
                        Serial.println("OK");
                  }
                  else
                  {
                        Serial.print("failed with error code ");
                        Serial.println(httpCode);
                        Serial.println("checking");
                  }
                  http.end();
            }
            else
            {
                  Serial.println("failed to connect to server");
            }
      }

      Serial.print("IR1: ");
      Serial.print(ir_1);
      Serial.print(" IR2: ");
      Serial.println(ir_2);
}
