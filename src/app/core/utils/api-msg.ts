export class ApiMessages {
    static readonly CREDENCIALS_INVALID = "Las credenciales ingresadas son incorrectas";
    static readonly RANGE_INFINITY_ALREADY_EXIST = "No puede existir otro nivel que no tenga rango máximo";
    static readonly DUPLICATE_RECORD_STEP = "El número de paso ingresado ya existe, intente con otro número";
    static readonly RANGE_ALREADY_EXIST = "El rango ingresado ya está asignado a otro nivel, intente con otro";
    static readonly DUPLICATE_RECORD_CODE = "El SKU / Código ingresado ya está asignado en otro producto";
    static readonly DUPLICATE_RECORD_DOCUMENT = "Lo sentimos, no podemos completar el registro. El documento de identificación ya se encuentra registrado en nuestro sistema.";
    static readonly DUPLICATE_RECORD_PURCHASE_INVOICE_NUMBER = "La Factura ya ha sido cargada anteriormente.";
    static readonly PRODUCT_QUANTITY_NOT_AVAILABLE = "La cantidad de productos requerida no está disponible";
    static readonly SEQUENTIAL_LOWER_VENDOR_BILLING_RANGE = "El secuencial es menor al rango de facturación del proveedor.";
    static readonly SEQUENTIAL_HIGHEST_VENDOR_BILLING_RANGE = "El secuencial es mayor al rango de facturación del proveedor.";
    static readonly CUSTOMER_HAS_OUTSTANDING_BALANCES = "No se puede procesar la devolución, debido a que el cliente tiene una deuda activa.";
    static readonly CASH_NOT_AVAILABLE_TO_DEPOSIT = "No está disponible la cantidad de efectivo para depositar";
    static readonly THE_AMOUNT_OF_THE_DUE_IS_NOT_WHAT_WAS_EXPECTED = "El importe total de la deuda no es el esperado";
    static readonly CUSTOMER_EXCEEDS_THE_DEBT_LIMIT = "El cliente ha excedido el límite de la deuda";
    static readonly WARRANTIES_STATUS_NOT_VALID_FOR_CHANGE = "El estado del producto no es valido para reposición de garantía.";
    static readonly CUSTOMER_IS_NOT_ELIGIBLE_FOR_CREDIT = "El cliente seleccionado no es apto para crédito";
}