enum G_RANGE{

    //% block="2g"      
    G_RANGE_2_G           = 0b00,
    
    //% block="4g"   
    G_RANGE_4_G           = 0b01,    

    //% block="8g"
    G_RANGE_8_G           = 0b10,    

    //% block="16g"
    G_RANGE_16_G          = 0b11   
   
}

enum LIS3DH_CONFIG {

    LIS3DH_NORMAL_MODE = 0x07
}

enum LIS3DH_DATA_RATE_CONFIG{

    //Power down mode
    //ODR3 / ODR2 / ODR1 / ODR0
    //0 0 0 0 
    POWER_DOWN = 0,

    //0 0 0 1 
    DATA_RATE_1_HZ = 1,

    //0 0 1 0 
    DATA_RATE_10_HZ = 2,

    //0 0 1 1 
    DATA_RATE_25_HZ = 3,

    //0 1 0 0 
    DATA_RATE_50_HZ = 4,

    //0 1 0 1 
    DATA_RATE_100_HZ = 5,
    
    //0 1 1 0 
    DATA_RATE_200_HZ = 6,    

    //0 1 1 1 
    DATA_RATE_400_HZ = 7,

    //1 0 0 0 
    LOW_POWER_MODE_1600_HZ = 8,
    
    //1 0 0 1 
    LOW_POWER_MODE_5000_HZ = 9    

}


/**
 * Driver for L1S3DH accelerometer, connected via I2C
 * with NO interrupt pin connected
 */
//% color="#00852B" weight=90 icon="\uf0b2"
//% groups='["Effects","Configuration"]'
namespace lis3dh{

    /* #region Register constants for the LIS3DH */

    const LIS3DH_ADDR = 0x18
    const LIS3DH_REG_WHOAMI = 0x0F

    const LIS3DH_STATUS_REG = 0x27
    const LIS3DH_STATUS_REG_AUX = 0x07

    const LIS3DH_OUT_X_L = 0x28
    const LIS3DH_OUT_X_H = 0x29
    const LIS3DH_OUT_Y_L = 0x2A
    const LIS3DH_OUT_Y_H = 0x2B
    const LIS3DH_OUT_Z_L = 0x2C
    const LIS3DH_OUT_Z_H = 0x2D

    const LIS3DH_OUT_ADC1_L = 0x08
    const LIS3DH_OUT_ADC1_H = 0x09
    const LIS3DH_OUT_ADC2_L = 0x0A
    const LIS3DH_OUT_ADC2_H = 0x0B
    const LIS3DH_OUT_ADC3_L = 0x0C
    const LIS3DH_OUT_ADC3_H = 0x0D

    const LIS3DH_CTRL_REG1 = 0x20
    const LIS3DH_CTRL_REG2 = 0x21
    const LIS3DH_CTRL_REG3 = 0x22
    const LIS3DH_CTRL_REG4 = 0x23
    const LIS3DH_CTRL_REG5 = 0x24
    const LIS3DH_CTRL_REG6 = 0x25

    const LIS3DH_INT1_CFG = 0x30
    const LIS3DH_INT1_SRC = 0x31
    const LIS3DH_INT1_THS = 0x32
    const LIS3DH_INT1_DURATION = 0x33

    const LIS3DH_INT_COUNTER_REG = 0x0E
    const LIS3DH_TEMP_CFG_REG = 0x1F
    const LIS3DH_FIFO_CTRL_REG = 0x2E
    const LIS3DH_FIFO_SRC_REG =  0x2F
  
    const LIS3DH_CLICK_CFG = 0x38
    const LIS3DH_CLICK_SRC = 0x39
    const LIS3DH_CLICK_THS = 0x3A
    const LIS3DH_TIME_LIMIT = 0x3B
    const LIS3DH_TIME_LATENCY = 0x3C
    const LIS3DH_TIME_WINDOW = 0x3D

    //* #endregion 

    /**
    * Set the motor mode (ERM or LRA) of the DRV2605
    */
    //% block
    //% group="Configuration"
    export function setAccelerationRange(accel: G_RANGE) {

        let accelerationRange = readRegister8(LIS3DH_ADDR, LIS3DH_CTRL_REG4);

        //
        accelerationRange &= ~(0x30);
        accelerationRange |= (accel << 4)
        writeRegister(LIS3DH_ADDR, LIS3DH_CTRL_REG4, accelerationRange);

    }

    export function getAccelerationRange() {
        return (readRegister8(LIS3DH_ADDR, LIS3DH_CTRL_REG4) >> 4) & 0x03;
    }


    function setupLIS3DH()
    {
        //First check if device exists or not
        if (!deviceExists())
        {
            console.log("LIS3DH not found");
            return;
        }

        //Standard setup based on startup sequence from ST LIS3DH Documentation

        //Setup LIS3DH to be in normal mode (acceleration data resolution is 10-bit)
        writeRegister(LIS3DH_ADDR, LIS3DH_CTRL_REG1, LIS3DH_CONFIG.LIS3DH_NORMAL_MODE);
       
        //Set data rate of LIS3DH
        setDataRate(LIS3DH_DATA_RATE_CONFIG.DATA_RATE_100_HZ);

        console.log(""+getDataRate());
        
    }

    function setDataRate(rate: LIS3DH_DATA_RATE_CONFIG)
    {
        let rateRegister = readRegister8(LIS3DH_ADDR, LIS3DH_CTRL_REG1);
        rateRegister &= ~(0xF0);
        rateRegister |= (rate << 4)
        writeRegister(LIS3DH_ADDR, LIS3DH_CTRL_REG1, rateRegister);
    }

    function getDataRate()
    {
        return (readRegister8(LIS3DH_ADDR, LIS3DH_CTRL_REG1) >> 4) & 0x0F;
    }

    
    //Checks 15 times if the sensor is connected and exists
    //otherwise returns false
    function deviceExists()
    {
        let _deviceChecked = readRegister8(LIS3DH_ADDR,LIS3DH_REG_WHOAMI);

        if (_deviceChecked != 0x33)
            return false;
        else   
            return true;
    }
}
