
export const SystemRegistry: Map<Function, string[]> = new Map();

export const autoRegisterSys = (requiredComponents: string[]) => {
    return function(target: Function){
        SystemRegistry.set(target, requiredComponents);
    }
}

export const ComponentRegistry: Set<Function> = new Set();

export const autoRegisterCom = (target: Function) => {
    ComponentRegistry.add(target);
}