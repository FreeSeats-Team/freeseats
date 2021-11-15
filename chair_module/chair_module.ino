#include <CapacitiveSensor.h>

/*
 * CapitiveSense Library Demo Sketch
 * Paul Badger 2008
 * Uses a high value resistor e.g. 10 megohm between send pin and receive pin
 * Resistor effects sensitivity, experiment with values, 50 kilohm - 50 megohm. Larger resistor values yield larger sensor values.
 * Receive pin is the sensor pin - try different amounts of foil/metal on this pin
 * Best results are obtained if sensor foil and wire is covered with an insulator such as paper or plastic sheet
 */


CapacitiveSensor cs_4_2 = CapacitiveSensor(2,4);        // 10 megohm resistor between pins 4 & 2, pin 2 is sensor pin, add wire, foil
long baseline_avg = 0;

void setup()                    
{
   pinMode(LED_BUILTIN, OUTPUT);
   cs_4_2.set_CS_AutocaL_Millis(0xFFFFFFFF);     // turn off autocalibrate on channel 1 - just as an example
   Serial.begin(9600);
   long avg = 0;
   for(int i = 0; i < 20; i++) {
    avg += cs_4_2.capacitiveSensor(30);
    delay(500);
   }
   baseline_avg = avg/10;
   char buf[50];
   sprintf(buf, "BASELINE = %lu\n", baseline_avg);
   Serial.print(buf);
}

void loop()                    
{
    long total1 =  cs_4_2.capacitiveSensor(30);

    //Serial.print(total1);                  // print sensor output 1
    //Serial.print("\n");
    if (total1 > (baseline_avg * 1.2)) {
        digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
        char buf[50];
        sprintf(buf, "1, OCCUPIED, %lu\n", total1);
        Serial.print(buf);
    } else {
        digitalWrite(LED_BUILTIN, LOW);   // turn the LED on (HIGH is the voltage level)
        char buf[50];
        sprintf(buf, "1, EMPTY, %lu\n", total1);
        Serial.print(buf);
    }
    

    delay(500);                             // arbitrary delay to limit data to serial port 
}
