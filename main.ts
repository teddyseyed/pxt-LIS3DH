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




/**
 * Driver for L1S3DH accelerometer, connected via I2C
 * with NO interrupt pin connected
 */
//% color="#00852B" weight=90 icon="\uf0b2"
//% groups='["Effects","Configuration"]'
namespace lis3dh{

    /* #region Register constants for the LIS3DH */

    const LIS3DH_REG_WHOAMI = 0x0F
    const LIS3DH_ADDR = 0x18


    //* #endregion 

    /**
    * Set the motor mode (ERM or LRA) of the DRV2605
    */
    //% block
    //% group="Configuration"
    export function setAccelerationRange(range: G_RANGE) {
        switch (range) {
            case G_RANGE.G_RANGE_2_G:
            {
            }
            case G_RANGE.G_RANGE_4_G:
            {
            }
            case G_RANGE.G_RANGE_8_G:
            {
            }
            case G_RANGE.G_RANGE_16_G:
            {
            }                        
        }
    }


    function setupLIS3DH()
    {
        //First check if device exists or not
        if (!deviceExists())
        {
            console.log("LIS3DH not found");
            return;
        }
        else
        {
            console.log("LIS3DH found");
        }
          
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
