# Unique Chill

A browser-based Bluetooth controller for **Unique / Unique Portables camping fridge/freezers** whose original Android app is no longer available in the Google Play Store.

This project was built for a **Unique UGP-45L portable fridge/freezer**, but it may also work with other rebranded/OEM portable fridge units that expose the same Bluetooth Low Energy service.

The app runs in **Chrome on Android** using Web Bluetooth and provides:

- Live fridge temperature
- Target temperature slider
- Power on/standby control
- ECO / NORM / QUICK cooling modes
- LOW / MID / HIGH battery protection mode
- Celsius/Fahrenheit toggle
- 24-hour device history sync
- Voltage history chart
- Raw BLE console for troubleshooting

---

## Why this exists

Some Unique portable fridge/freezers were sold with Bluetooth control as a feature, but the original **Unique Appliance** Android app appears to have disappeared from the Play Store.

This project is an open replacement so owners can continue using the Bluetooth features of hardware they already bought.

---

## Known working device

Tested with:

```text
Model: Unique UGP-45L
Bluetooth name: Fridge00D71 / FRIDGE00D71
MAC: 44:A6:E5:41:5F:C7
Firmware: V3.35
Board: HMCZ-60 V2.225
````

The tested unit uses:

```text
Address bytes:      0D 71
Communication code: 00 0D 71
```

Your unit will probably have different values.

---

## Requirements

### Phone/browser

Use:

```text
Android phone
Chrome browser
Bluetooth enabled
Location enabled
Chrome permission: Nearby devices
Chrome permission: Location
```

Web Bluetooth works best in Chrome on Android. It may not work in Firefox, Safari, or a normal Android WebView.

### Fridge

Your fridge must advertise a BLE device name similar to:

```text
FridgeXXXXX
FRIDGEXXXXX
```

and expose this BLE service:

```text
Service: 00001000-0000-1000-8000-00805f9b34fb

RX / write:
00001001-0000-1000-8000-00805f9b34fb

TX / notify:
00001002-0000-1000-8000-00805f9b34fb
```

---

## Quick start

1. Open the HTML app in **Chrome on Android**.
2. Tap **Connect**.
3. Select your fridge from the Bluetooth picker.
4. Wait for the first status poll.
5. Use the slider or controls.

If it connects but controls do not apply, your unit likely needs different address/communication values. See the setup section below.

---

## Finding your fridge values

The tested unit is named:

```text
Fridge00D71
```

From that, the working values are:

```text
Address bytes:      0D 71
Communication code: 00 0D 71
```

For many units, the values appear to be derived from the last part of the Bluetooth name.

### Example

If your fridge is:

```text
Fridge01234
```

try:

```text
Address bytes:      12 34
Communication code: 01 12 34
```

If your fridge is:

```text
Fridge00D71
```

use:

```text
Address bytes:      0D 71
Communication code: 00 0D 71
```

If your fridge is:

```text
Fridge0ABCD
```

try:

```text
Address bytes:      AB CD
Communication code: 0A AB CD
```

The app has an **Advanced BLE console** where you can set:

```text
Address bytes
Communication code
Device param override
Write method
```

For most users, only **Address bytes** and **Comm code** should need adjustment.

---

## How to confirm your BLE service

Install a BLE scanner such as **nRF Connect** on Android.

1. Turn on the fridge.
2. Open nRF Connect.
3. Scan for nearby BLE devices.
4. Look for a device named something like `FridgeXXXXX`.
5. Connect to it.
6. Confirm you see:

```text
Service UUID: 0x1000

Characteristic 0x1001
Properties: READ, WRITE, WRITE WITHOUT RESPONSE
Role: command/write channel

Characteristic 0x1002
Properties: NOTIFY, READ
Role: status/response channel
```

If you do not see service `0x1000`, this app probably will not work with your fridge without further reverse engineering.

---

## Protocol notes

The fridge uses a simple BLE protocol over service `0x1000`.

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

### Write/settings frame

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

## Common problems

### The fridge appears in nRF Connect but Android pairing times out

That is normal. These fridges use BLE app-level communication, not normal Android Bluetooth pairing.

Do not pair it from Android Bluetooth settings. Connect from the app/browser instead.

### The app connects but buttons do not change anything

Your address or communication code is probably wrong.

Check your Bluetooth name. For example:

```text
Fridge00D71
```

should use:

```text
Address bytes: 0D71
Comm code:     000D71
```

### The app cannot find the fridge

Try:

1. Turn Bluetooth off/on.
2. Turn Location on.
3. Check Chrome permissions:

   * Nearby devices
   * Location
4. Power-cycle the fridge.
5. Use nRF Connect to confirm the fridge is advertising.

### History sync looks wrong

History decoding was reverse engineered from one tested unit. Other units may encode history differently.

Open an issue with:

```text
Fridge Bluetooth name
Address bytes used
Comm code used
Raw history notify logs
Screenshot of native app chart, if available
```

---

## Running locally

The simplest way is to open the HTML file in Chrome on Android.

For a better experience, host it over HTTPS and add it to the Android home screen as a web app/PWA.

A fully local APK requires a native Android BLE implementation or a Capacitor app with a native BLE bridge. A plain WebView wrapper is not enough because Web Bluetooth is not reliably available inside Android WebView.

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

* Confirmed working fridge models
* Bluetooth names and matching address/comm codes
* btsnoop logs from the original app
* Fixes for history decoding
* Native Android/Kotlin BLE port
* Capacitor native BLE plugin implementation

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

This is an unofficial community replacement for a missing/discontinued app.

It is not affiliated with Unique Appliances, Unique Off-Grid, or the original app developer.

Use at your own risk.

````

I’d name the repo something searchable like:

```text
unique-chill-fridge-controller
````

or:

```text
unique-portable-fridge-bluetooth-controller
```
