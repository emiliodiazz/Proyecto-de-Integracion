import LandingLayout from "@/layouts/LandinLayout";
import { title } from "process";

export const metadata ={
    title: "Parking-Sytem Precios"
}

const Precios = () =>{
    return(
        <LandingLayout>
            <div>
                <h1>
                    Precios
                </h1>
            </div>
        </LandingLayout>
    );

}

export default Precios;