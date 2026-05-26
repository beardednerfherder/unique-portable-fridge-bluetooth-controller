# Unique Chill

## Alternative app for Unique UGP-45L Bluetooth fridge/freezer

Unique Chill is an open-source replacement Bluetooth controller for Unique Appliances / Unique Off-Grid portable fridge/freezers such as the UGP-45L.

It was created because the original Unique Appliance Android app appears to no longer be available in the Google Play Store.

This project may help if you are searching for:

- Unique UGP-45L Bluetooth app
- Unique Appliance app missing from Google Play
- Unique portable fridge Bluetooth controller
- Fridge00D71 Bluetooth controller
- Unique Off-Grid fridge app replacement
- UGP-45L app
- Unique Chill

This app runs in **Chrome on Android** using Web Bluetooth.

It was built and tested with a **Unique UGP-45L portable fridge/freezer**, but it may also help owners of other Unique Bluetooth fridge/freezer models if they use a similar Bluetooth setup.

---

<img width="384" height="1224" alt="Unique Chill screenshot" src="https://github.com/user-attachments/assets/50049af2-292e-4130-892f-a0493b22f0d2" />

---

## Features

- Connects to the fridge over Bluetooth
- Shows live fridge temperature
- Lets you set the target temperature
- Power on / standby control
- ECO / NORM / QUICK cooling modes
- LOW / MID / HIGH battery protection mode
- Celsius / Fahrenheit toggle
- 24-hour device history sync
- Voltage history chart
- Advanced BLE console for troubleshooting

---

## Why this exists

Some Unique portable fridge/freezers were sold with Bluetooth control as a feature, but the original **Unique Appliance** Android app appears to have disappeared from the Google Play Store.

The fridge still works, but the app may not.

This project is an unofficial replacement so owners can continue using the Bluetooth features of hardware they already bought.

It does not require:

- The original Unique app
- A manufacturer server
- An app store install
- A random APK from a mirror site

---

## Known working device

Tested with:

```text
Model: Unique UGP-45L
Bluetooth name: Fridge00D71 / FRIDGE00D71
MAC: 44:A6:E5:41:5F:C7
Firmware: V3.35
Board: HMCZ-60 V2.225
```

The tested unit uses:

```text
Address bytes: 0D71
Comm code:     000D71
```

Your unit may use different values.

---

## Requirements

### Phone / browser

Use:

```text
Android phone
Chrome browser
Bluetooth enabled
Location enabled
Chrome permission: Nearby devices
Chrome permission: Location
```

Web Bluetooth works best in **Chrome on Android**.

It may not work in Firefox, Safari, or a normal Android WebView.

### Fridge

Your fridge should advertise a Bluetooth name similar to:

```text
FridgeXXXXX
FRIDGEXXXXX
```

The tested fridge uses this BLE service:

```text
Service:
00001000-0000-1000-8000-00805f9b34fb

RX / write:
00001001-0000-1000-8000-00805f9b34fb

TX / notify:
00001002-0000-1000-8000-00805f9b34fb
```

---

## Quick start

1. Open the web app in **Chrome on Android**:

   https://beardednerfherder.github.io/unique-chill/

2. Install it locally as a PWA:

   - Tap the **three-dot menu** in Chrome.
   - Tap **Add to Home screen** or **Install app**.
   - Confirm the install.

3. Open **Unique Chill** from your phone’s home screen.

4. Tap **Connect**.

5. Select your fridge from the Bluetooth picker.

6. Wait for the first status poll.

7. Use the slider or controls.

Once installed, the app runs locally from your phone like a regular app.

If it connects but controls do not apply, your fridge may need different setup values. See **Setup for your fridge** below.

---

## Setup for your fridge

Unique Chill was tested with one fridge:

```text
Model: Unique UGP-45L
Bluetooth name: Fridge00D71
```

That fridge uses:

```text
Address bytes: 0D71
Comm code:     000D71
```

Your fridge may use different values.

In many cases, the values appear to come from the Bluetooth name.

---

## How to find your values

Look at the Bluetooth name shown when you tap **Connect**.

### Example 1

If your fridge name is:

```text
Fridge00D71
```

use:

```text
Address bytes: 0D71
Comm code:     000D71
```

### Example 2

If your fridge name is:

```text
Fridge01234
```

try:

```text
Address bytes: 1234
Comm code:     011234
```

### Example 3

If your fridge name is:

```text
Fridge0ABCD
```

try:

```text
Address bytes: ABCD
Comm code:     0AABCD
```

---

## Where to enter setup values

1. Open **Unique Chill**.
2. Tap **Connect**.
3. Connect to your fridge.
4. Open the **Advanced / BLE console** section.
5. Enter your values for:

```text
Address bytes
Comm code
```

6. Try the temperature slider or power button again.

For most users, these are the only two values that should need changing.

If the app connects but the controls still do nothing, your fridge may use a different Bluetooth command format.

In that case, open a GitHub issue and include:

```text
Fridge model:
Bluetooth name:
Address bytes tried:
Comm code tried:
What works:
What does not work:
Screenshots or BLE logs if available:
```

---

## Optional: Confirm the Bluetooth service

If the app cannot control your fridge, you can use a BLE scanner app to check whether your fridge exposes the same Bluetooth service.

Install a BLE scanner such as **nRF Connect** on Android.

1. Turn on the fridge.
2. Open nRF Connect.
3. Scan for nearby BLE devices.
4. Look for a device named something like `FridgeXXXXX`.
5. Connect to it.
6. Confirm you see this service:

```text
Service UUID:
00001000-0000-1000-8000-00805f9b34fb
```

And these characteristics:

```text
Write / RX:
00001001-0000-1000-8000-00805f9b34fb

Notify / TX:
00001002-0000-1000-8000-00805f9b34fb
```

If you do not see service `0x1000`, this app probably will not work with your fridge without further reverse engineering.

---

## Common problems

### The fridge appears in nRF Connect but Android pairing times out

That is normal.

These fridges use BLE app-level communication, not normal Android Bluetooth pairing.

Do not pair it from Android Bluetooth settings.

Connect from the app/browser instead.

---

### The app connects but buttons do not change anything

Your address bytes or communication code are probably wrong.

Check your Bluetooth name.

For example:

```text
Fridge00D71
```

should use:

```text
Address bytes: 0D71
Comm code:     000D71
```

Try updating those values in the **Advanced / BLE console** section.

---

### The app cannot find the fridge

Try:

1. Turn Bluetooth off and back on.
2. Turn Location on.
3. Check Chrome permissions:
   - Nearby devices
   - Location
4. Power-cycle the fridge.
5. Use nRF Connect to confirm the fridge is advertising.

---

### History sync looks wrong

History decoding was reverse engineered from one tested unit.

Other units may encode history differently.

Open an issue with:

```text
Fridge Bluetooth name:
Address bytes used:
Comm code used:
Raw history notify logs:
Screenshot of native app chart, if available:
```

---

## Running locally

The easiest way to use the app is from the hosted page:

```text
https://beardednerfherder.github.io/unique-chill/
```

Then install it to your phone:

1. Open the page in Chrome on Android.
2. Tap the Chrome three-dot menu.
3. Tap **Add to Home screen** or **Install app**.
4. Open it from your home screen.

You can also host the HTML yourself over HTTPS.

A fully local APK would require a native Android BLE implementation or a Capacitor app with a native BLE bridge.

A plain WebView wrapper is not enough because Web Bluetooth is not reliably available inside Android WebView.

---

## Protocol notes

The fridge uses a simple BLE protocol over service `0x1000`.

Most users do not need this section.

This is mainly here for troubleshooting, testing, and adapting the app to other models.

---

### Normal live status poll

The app sends an 11-byte poll frame to characteristic `0x1001`:

```text
68 09 FF FF FF [comm0] [comm1] [comm2] 0A [checksum] EC
```

For the tested unit:

```text
68 09 FF FF FF 00 0D 71 0A 8E EC
```

The fridge responds on notify characteristic `0x1002`.

---

### Device history poll

The app sends a similar frame, but with command byte `0C`:

```text
68 09 FF FF FF [comm0] [comm1] [comm2] 0C [checksum] EC
```

For the tested unit:

```text
68 09 FF FF FF 00 0D 71 0C 90 EC
```

The fridge then streams stored 24-hour history pages.

---

### Write / settings frame

Most controls use a 19-byte write frame:

```text
68 11 03 [addrH] [addrL] [comm0] [comm1] [comm2] 0B 00 00 00 [setTemp] 00 00 [deviceParam] 00 [checksum] EC
```

For the tested fridge:

```text
Address: 0D 71
Comm:    00 0D 71
```

Target temperature is encoded as:

```text
wireTemp = tempC + 50
```

Examples:

```text
-18°C => 32 decimal => 0x20
-10°C => 40 decimal => 0x28
  0°C => 50 decimal => 0x32
```

Checksum is the low byte of the sum of bytes `[1]` through `[16]`.

---

## Security and safety notes

This project is unofficial and reverse engineered.

Do not send random BLE writes unless you understand what they do.

In particular, avoid writing to the vendor reset service:

```text
Service:
f000ffd0-0451-4000-b000-000000000000

Characteristic:
f000ffd1-0451-4000-b000-000000000000

Description:
Reset
```

That service appears to be related to the Bluetooth module reset/configuration and is not needed for normal fridge control.

---

## Contributing

Useful contributions:

- Confirmed working fridge models
- Bluetooth names and matching address/comm codes
- BLE logs from the original app
- Fixes for history decoding
- Native Android/Kotlin BLE port
- Capacitor native BLE plugin implementation
- Testing with other Unique Bluetooth fridge/freezer models

When opening an issue, include:

```text
Fridge model:
Bluetooth name:
BLE MAC if available:
Firmware/board version if known:
Address bytes used:
Comm code used:
What works:
What does not work:
Raw BLE console logs:
```

---

## Disclaimer

This is an unofficial community replacement for a missing or discontinued app.

It is not affiliated with Unique Appliances, Unique Off-Grid, or the original app developer.

Use at your own risk.
