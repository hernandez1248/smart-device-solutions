import Device from "./device";

class AddDevicesResult {
    device?: Device;
    error?: boolean;
    message: string;
    errors?: {
      error: string,
      field: string
    } [] | null;
    
    constructor(
      message: string,
      device: Device,
    ){        
      this.message = message
      this.device = device;
    }
}
export default AddDevicesResult;
