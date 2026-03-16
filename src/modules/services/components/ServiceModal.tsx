import { useForm } from "react-hook-form";
import Modal from "../../../components/ui/Modal";
import { useEffect } from "react";
import supabase from "../../auth/utils/supabase";
import { toast } from "react-toastify";
import InputMessage from "../../../components/ui/InputMessage";
import type { PromoRulesJson, Service } from "../../../types/services";
import { SERVICE_FORM_RULES } from "../../../constants/services";

type ServiceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

type ServiceForm = PromoRulesJson & {
  name: string;
  price: number;
  unit: string;
  has_promo: boolean;
  promo_type: string;
}

const UNIT_TYPES =  [
  {id: 1, name: "pieza", value: "pza"},
  {id: 2, name: "par", value: "par"},
  {id: 3, name: "kilo", value: "kg"},
]

const PROMO_TYPES = [
  {id: 1, name: "multiplo (NxM)", value: "nxm"},
  {id: 2, name: "porcentaje", value: "percent"},
]

// funcion que crea las reglas de validacion para el campo price y los campos dinamicos de multiplo y porcentaje
function createRules(active: boolean, fieldName: string, maxQuantity: number = 9999) {
  return {
    isNumber: (value: string | number | undefined) => {
      if (!active) return true;
      return !isNaN(Number(value)) || `el ${fieldName} debe ser un numero`;
    },
    isPositive: (value: string | number | undefined) => {
      if (!active) return true;
      return Number(value) > 0 || `el ${fieldName} debe ser mayor a 0`;
    },
    maxQuantity: (value: string | number | undefined) => {
      if (!active) return true;
      return Number(value) <= maxQuantity || `el ${fieldName} debe ser menor a ${maxQuantity}`;
    }
  }
}

export default function ServiceModal({isOpen, onClose, service}: ServiceModalProps) {
  // HOOKS
  const {register, handleSubmit, reset, watch, resetField, setValue, formState: {errors, isValid}} = useForm<ServiceForm>({mode: "onTouched"});

  // DERIVADOS
  const isEditing = service !== null;
  const [hasPromo, promoType] = watch(["has_promo", "promo_type"]);

  // FUNCIONES
  async function sendForm(data: ServiceForm) {
    const {name, price, unit, has_promo, buy, pay, percent, promo_type} = data;
    let promoRules = null;
    if (has_promo) {
      if (promo_type === "nxm") {
        promoRules = {buy, pay}
      } else {
        promoRules = {percent}
      }
    }

    const payload = {
      name,
      price,
      unit,
      has_promo,
      promo_type,
      promo_rules: promoRules
    };

    const errorAction = service ? "actualizar" : "crear";
    const successAction = service ? "actualizado": "creado";

    // define la peticion a supabase
    const query = supabase.from("services");
    // si es hay un servicio actualiza, si no inserta
    const request = service
      ? query.update(payload).eq("id", service.id)
      : query.insert(payload);

    // ejecuta la peticion
    const {error} = await request;

    if (error) {
      toast.error(`Error al ${errorAction} el servicio ${error.message}`);
      console.error(error)
      return;
    }

    toast.success(`El servicio fue ${successAction} con exito`);
    handleClose();
  }

  // MANEJADORES
  const handleClose = () => {
    onClose()
    reset();
  }

  // EFECTOS
  // llena el formulario si se esta editando un servicio
  useEffect(() => {
    if (service) {
      setValue("name", service.name);
      setValue("price", service.price);
      setValue("unit", service.unit);
      setValue("has_promo", service.has_promo);
      setValue("promo_type", service.promo_type || "");
      if (service.has_promo && service.promo_rules) {
        const rules = service.promo_rules as PromoRulesJson;
        if (service.promo_type === "nxm") {
          setValue("buy", rules.buy)
          setValue("pay", rules.pay)
        } else {
          setValue("percent", rules.percent)
        }
      }
    }
  }, [service, setValue]);

  // limpia el tipo de promocion al activar o desactivar la promocion
  useEffect(() => {
    if (!hasPromo) {
      resetField("promo_type");
    }
  }, [hasPromo, resetField]);

  // limpia los campos dinamicos de multiplo o porcentaje cuando se cambia el tipo de promocion
  useEffect(() => {
    if (promoType === "nxm") {
      resetField("percent")
    } else {
      resetField("buy");
      resetField("pay");
    }
  }, [promoType, resetField]);
  
  // VISTA
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <form className="" onSubmit={handleSubmit(sendForm)}>
          <fieldset className="flex flex-col gap-4">
            <legend className="uppercase font-bold text-2xl mx-auto">{isEditing ? "modificar servicio" : "agregar servicio"}</legend>
            {/* service name */}
            <div className="">
              <label htmlFor="name" className="capitalize">nombre de servicio: </label>
              <input 
                type="text"
                id="name"
                placeholder={SERVICE_FORM_RULES.name.placeholder}
                className="w-full"
                {...register("name", SERVICE_FORM_RULES.name)}
              />
              {errors.name && <InputMessage capitalize error message={errors.name.message} />}
            </div>

            {/* price */}
            <div className="">
              <label htmlFor="price" className="capitalize">precio: </label>
              <input
                type="text"
                id="price"
                className="w-full"
                placeholder="ingresa el precio"
                inputMode="decimal"
                {...register("price", {
                  required: "el precio es obligatorio",
                  validate: createRules(true, "precio")
                })}
              />
              {errors.price && <InputMessage capitalize error message={errors.price.message} />}
            </div>

            {/* unit */}
            <div className="">
              <label htmlFor="unit" className="capitalize">unidad: </label>
              <select
                id="unit"
                className="capitalize w-full"
                {...register("unit", {
                  required: "la unidad es obligatoria"
                })}
              >
                <option value="">selecciona una unidad</option>
                {UNIT_TYPES.map(unit =>
                  <option key={unit.id} value={unit.value} className="">{unit.name}</option>
                )}
              </select>
              {errors.unit && <InputMessage capitalize error message={errors.unit.message} />}
            </div>

            {/* has_promo */}
            <div className="">
              <div className="flex justify-between gap-4 flex-wrap">
                <label className="cursor-pointer capitalize select-none text-sm text-gray-600 flex items-center justify-center gap-3">
                  ¿tiene promocion?
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    {...register("has_promo")}
                  />
                  <div className="rounded-full w-12 h-6  bg-gray-400 shadow-md peer-checked:bg-blue-400 after:content-[''] after:block after:bg-white after:w-6 after:h-6 after:border after:border-gray-300 after:rounded-full peer-checked:after:translate-x-full after:transition-all"></div>
                </label>
                {/* promo_type */}
                {hasPromo && (
                  <>
                    <select 
                      id=""
                      className="capitalize w-full"
                      {...register("promo_type", {
                        required: "el tipo de promocion es obligatoria"
                      })}
                    >
                      <option value="">selecciona el tipo de promoción</option>
                      {PROMO_TYPES.map(promo => 
                        <option key={promo.id} value={promo.value}>{promo.name}</option>
                      )}
                    </select>
                  </>
                )}
              </div>
              {errors.promo_type && <InputMessage capitalize error message={errors.promo_type.message} />}
              {/* promo_rules */}
              {promoType && <>
                {promoType === "nxm" 
                  ? (<>
                      {/* en caso de multiplo */}
                      {/* compra */}
                      <div className="">
                        <label htmlFor="buy" className="capitalize">compra: </label>
                        <input
                          type="text"
                          id="buy"
                          inputMode="numeric"
                          className="w-full"
                          placeholder="ingresa la cantidad de compra"
                          {...register("buy", {
                            required: promoType === "nxm" ? "la cantidad de compra es requerida" : false,
                            validate: createRules(promoType === "nxm", "valor de compra")
                          })}
                        />
                        {errors.buy && <InputMessage capitalize error message={errors.buy.message} />}
                      </div>
                      {/* paga */}
                      <div className="">
                        <label htmlFor="pay" className="capitalize">paga: </label>
                        <input
                          type="text"
                          id="pay"
                          inputMode="numeric"
                          className="w-full"
                          placeholder="ingresa la cantidad de paga"
                          {...register("pay", {
                            required: promoType === "nxm" ? "la cantidad de pago es requerida" : false,
                            validate: createRules(promoType === "nxm", "valor de paga")
                          })}
                        />
                        {errors.pay && <InputMessage capitalize error message={errors.pay.message} />}
                      </div>
                    </>) 
                  : (<>
                      {/* en caso de porcentaje */}
                      <div className="">
                        <label htmlFor="percent" className="capitalize">porcentaje: </label>
                        <input
                          type="text"
                          id="percent"
                          inputMode="numeric"
                          className="w-full"
                          placeholder="ingresa el porcentaje"
                          {...register("percent", {
                            required: promoType === "percent" ? "la cantidad de pago es requerida" : false,
                            validate: createRules(promoType === "percent", "porcentaje", 100)
                          })}
                        />
                        {errors.percent && <InputMessage capitalize error message={errors.percent.message} />}
                      </div>
                    </>)
                }
              </>}
              
            </div>

            <input type="submit" value={isEditing ? "editar servicio" : "agregar servicio"} disabled={!isValid} />
          </fieldset>
        </form>
      </Modal>
    </>
  )
}
