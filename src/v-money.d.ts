declare module 'v-money' {
    import { PluginFunction } from 'vue';

    interface VMoneyOptions {
        decimal: string;
        thousands: string;
        prefix: string;
        suffix: string;
        precision: number;
        masked: boolean;
    }

    const VMoney: {
        install: PluginFunction<VMoneyOptions>;
    };

    export default VMoney;
}