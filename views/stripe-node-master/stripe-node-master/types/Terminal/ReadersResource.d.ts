// File generated from our OpenAPI spec

declare module 'stripe' {
  namespace Stripe {
    namespace Terminal {
      interface ReaderCreateParams {
        /**
         * A code generated by the reader used for registering to an account.
         */
        registration_code: string;

        /**
         * Specifies which fields in the response should be expanded.
         */
        expand?: Array<string>;

        /**
         * Custom label given to the reader for easier identification. If no label is specified, the registration code will be used.
         */
        label?: string;

        /**
         * The location to assign the reader to.
         */
        location?: string;

        /**
         * Set of [key-value pairs](https://stripe.com/docs/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.
         */
        metadata?: Stripe.Emptyable<Stripe.MetadataParam>;
      }

      interface ReaderRetrieveParams {
        /**
         * Specifies which fields in the response should be expanded.
         */
        expand?: Array<string>;
      }

      interface ReaderUpdateParams {
        /**
         * Specifies which fields in the response should be expanded.
         */
        expand?: Array<string>;

        /**
         * The new label of the reader.
         */
        label?: Stripe.Emptyable<string>;

        /**
         * Set of [key-value pairs](https://stripe.com/docs/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.
         */
        metadata?: Stripe.Emptyable<Stripe.MetadataParam>;
      }

      interface ReaderListParams extends PaginationParams {
        /**
         * Filters readers by device type
         */
        device_type?: ReaderListParams.DeviceType;

        /**
         * Specifies which fields in the response should be expanded.
         */
        expand?: Array<string>;

        /**
         * A location ID to filter the response list to only readers at the specific location
         */
        location?: string;

        /**
         * Filters readers by serial number
         */
        serial_number?: string;

        /**
         * A status filter to filter readers to only offline or online readers
         */
        status?: ReaderListParams.Status;
      }

      namespace ReaderListParams {
        type DeviceType =
          | 'bbpos_chipper2x'
          | 'bbpos_wisepad3'
          | 'bbpos_wisepos_e'
          | 'mobile_phone_reader'
          | 'simulated_wisepos_e'
          | 'stripe_m2'
          | 'stripe_s700'
          | 'verifone_P400';

        type Status = 'offline' | 'online';
      }

      interface ReaderDeleteParams {}

      interface ReaderCancelActionParams {
        /**
         * Specifies which fields in the response should be expanded.
         */
        expand?: Array<string>;
      }

      interface ReaderProcessPaymentIntentParams {
        /**
         * PaymentIntent ID
         */
        payment_intent: string;

        /**
         * Specifies which fields in the response should be expanded.
         */
        expand?: Array<string>;

        /**
         * Configuration overrides
         */
        process_config?: ReaderProcessPaymentIntentParams.ProcessConfig;
      }

      namespace ReaderProcessPaymentIntentParams {
        interface ProcessConfig {
          /**
           * This field indicates whether this payment method can be shown again to its customer in a checkout flow. Stripe products such as Checkout and Elements use this field to determine whether a payment method can be shown as a saved payment method in a checkout flow.
           */
          allow_redisplay?: ProcessConfig.AllowRedisplay;

          /**
           * Enables cancel button on transaction screens.
           */
          enable_customer_cancellation?: boolean;

          /**
           * Override showing a tipping selection screen on this transaction.
           */
          skip_tipping?: boolean;

          /**
           * Tipping configuration for this transaction.
           */
          tipping?: ProcessConfig.Tipping;
        }

        namespace ProcessConfig {
          type AllowRedisplay = 'always' | 'limited' | 'unspecified';

          interface Tipping {
            /**
             * Amount used to calculate tip suggestions on tipping selection screen for this transaction. Must be a positive integer in the smallest currency unit (e.g., 100 cents to represent $1.00 or 100 to represent ¥100, a zero-decimal currency).
             */
            amount_eligible?: number;
          }
        }
      }

      interface ReaderProcessSetupIntentParams {
        /**
         * This field indicates whether this payment method can be shown again to its customer in a checkout flow. Stripe products such as Checkout and Elements use this field to determine whether a payment method can be shown as a saved payment method in a checkout flow.
         */
        allow_redisplay: ReaderProcessSetupIntentParams.AllowRedisplay;

        /**
         * SetupIntent ID
         */
        setup_intent: string;

        /**
         * Specifies which fields in the response should be expanded.
         */
        expand?: Array<string>;

        /**
         * Configuration overrides
         */
        process_config?: ReaderProcessSetupIntentParams.ProcessConfig;
      }

      namespace ReaderProcessSetupIntentParams {
        type AllowRedisplay = 'always' | 'limited' | 'unspecified';

        interface ProcessConfig {
          /**
           * Enables cancel button on transaction screens.
           */
          enable_customer_cancellation?: boolean;
        }
      }

      interface ReaderRefundPaymentParams {
        /**
         * A positive integer in __cents__ representing how much of this charge to refund.
         */
        amount?: number;

        /**
         * ID of the Charge to refund.
         */
        charge?: string;

        /**
         * Specifies which fields in the response should be expanded.
         */
        expand?: Array<string>;

        /**
         * Set of [key-value pairs](https://stripe.com/docs/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.
         */
        metadata?: Stripe.MetadataParam;

        /**
         * ID of the PaymentIntent to refund.
         */
        payment_intent?: string;

        /**
         * Boolean indicating whether the application fee should be refunded when refunding this charge. If a full charge refund is given, the full application fee will be refunded. Otherwise, the application fee will be refunded in an amount proportional to the amount of the charge refunded. An application fee can be refunded only by the application that created the charge.
         */
        refund_application_fee?: boolean;

        /**
         * Configuration overrides
         */
        refund_payment_config?: ReaderRefundPaymentParams.RefundPaymentConfig;

        /**
         * Boolean indicating whether the transfer should be reversed when refunding this charge. The transfer will be reversed proportionally to the amount being refunded (either the entire or partial amount). A transfer can be reversed only by the application that created the charge.
         */
        reverse_transfer?: boolean;
      }

      namespace ReaderRefundPaymentParams {
        interface RefundPaymentConfig {
          /**
           * Enables cancel button on transaction screens.
           */
          enable_customer_cancellation?: boolean;
        }
      }

      interface ReaderSetReaderDisplayParams {
        /**
         * Type
         */
        type: 'cart';

        /**
         * Cart
         */
        cart?: ReaderSetReaderDisplayParams.Cart;

        /**
         * Specifies which fields in the response should be expanded.
         */
        expand?: Array<string>;
      }

      namespace ReaderSetReaderDisplayParams {
        interface Cart {
          /**
           * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
           */
          currency: string;

          /**
           * Array of line items that were purchased.
           */
          line_items: Array<Cart.LineItem>;

          /**
           * The amount of tax in cents.
           */
          tax?: number;

          /**
           * Total balance of cart due in cents.
           */
          total: number;
        }

        namespace Cart {
          interface LineItem {
            /**
             * The price of the item in cents.
             */
            amount: number;

            /**
             * The description or name of the item.
             */
            description: string;

            /**
             * The quantity of the line item being purchased.
             */
            quantity: number;
          }
        }
      }

      class ReadersResource {
        /**
         * Creates a new Reader object.
         */
        create(
          params: ReaderCreateParams,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.Terminal.Reader>>;

        /**
         * Retrieves a Reader object.
         */
        retrieve(
          id: string,
          params?: ReaderRetrieveParams,
          options?: RequestOptions
        ): Promise<
          Stripe.Response<
            Stripe.Terminal.Reader | Stripe.Terminal.DeletedReader
          >
        >;
        retrieve(
          id: string,
          options?: RequestOptions
        ): Promise<
          Stripe.Response<
            Stripe.Terminal.Reader | Stripe.Terminal.DeletedReader
          >
        >;

        /**
         * Updates a Reader object by setting the values of the parameters passed. Any parameters not provided will be left unchanged.
         */
        update(
          id: string,
          params?: ReaderUpdateParams,
          options?: RequestOptions
        ): Promise<
          Stripe.Response<
            Stripe.Terminal.Reader | Stripe.Terminal.DeletedReader
          >
        >;

        /**
         * Returns a list of Reader objects.
         */
        list(
          params?: ReaderListParams,
          options?: RequestOptions
        ): ApiListPromise<Stripe.Terminal.Reader>;
        list(options?: RequestOptions): ApiListPromise<Stripe.Terminal.Reader>;

        /**
         * Deletes a Reader object.
         */
        del(
          id: string,
          params?: ReaderDeleteParams,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.Terminal.DeletedReader>>;
        del(
          id: string,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.Terminal.DeletedReader>>;

        /**
         * Cancels the current reader action.
         */
        cancelAction(
          id: string,
          params?: ReaderCancelActionParams,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.Terminal.Reader>>;
        cancelAction(
          id: string,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.Terminal.Reader>>;

        /**
         * Initiates a payment flow on a Reader.
         */
        processPaymentIntent(
          id: string,
          params: ReaderProcessPaymentIntentParams,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.Terminal.Reader>>;

        /**
         * Initiates a setup intent flow on a Reader.
         */
        processSetupIntent(
          id: string,
          params: ReaderProcessSetupIntentParams,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.Terminal.Reader>>;

        /**
         * Initiates a refund on a Reader
         */
        refundPayment(
          id: string,
          params?: ReaderRefundPaymentParams,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.Terminal.Reader>>;
        refundPayment(
          id: string,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.Terminal.Reader>>;

        /**
         * Sets reader display to show cart details.
         */
        setReaderDisplay(
          id: string,
          params: ReaderSetReaderDisplayParams,
          options?: RequestOptions
        ): Promise<Stripe.Response<Stripe.Terminal.Reader>>;
      }
    }
  }
}