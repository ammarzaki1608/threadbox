import { redirect } from "next/navigation";
import { GOOGLE_FORM_ORDER_LINK } from "@/lib/config";

export default function CheckoutPage() {
  redirect(GOOGLE_FORM_ORDER_LINK);
}
