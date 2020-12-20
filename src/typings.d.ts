declare var System: System;
interface System {
  import(request: string): Promise<any>;
}

// so the typescript compiler doesn't complain about the global config object
declare var config: any;