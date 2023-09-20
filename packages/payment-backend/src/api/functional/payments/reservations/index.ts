/**
 * @packageDocumentation
 * @module api.functional.payments.reservations
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import type { IConnection, Primitive } from "@nestia/fetcher";
import { EncryptedFetcher } from "@nestia/fetcher/lib/EncryptedFetcher";
import typia from "typia";
import type { Format } from "typia/lib/tags/Format";

import type { IPaymentReservation } from "../../../structures/payments/IPaymentReservation";
import type { IPaymentSource } from "../../../structures/payments/IPaymentSource";
import { NestiaSimulator } from "../../../utils/NestiaSimulator";

/**
 * 간편 결제 수단 조회하기.
 * 
 * @param input 간편 결제 수단의 원천 정보 + 비밀번호
 * @returns 결제 내역
 * 
 * @controller PaymentReservationsController.get
 * @path PATCH /payments/reservations/get
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function get(
    connection: IConnection,
    input: get.Input,
): Promise<get.Output> {
    return !!connection.simulate
        ? get.simulate(
              connection,
              input,
          )
        : EncryptedFetcher.fetch(
              {
                  ...connection,
                  headers: {
                      ...(connection.headers ?? {}),
                      "Content-Type": "text/plain",
                  },
              },
              {
                  ...get.METADATA,
                  path: get.path(),
              } as const,
              input,
          );
}
export namespace get {
    export type Input = Primitive<IPaymentSource.IAccessor>;
    export type Output = Primitive<IPaymentReservation>;

    export const METADATA = {
        method: "PATCH",
        path: "/payments/reservations/get",
        request: {
            type: "text/plain",
            encrypted: true
        },
        response: {
            type: "text/plain",
            encrypted: true,
        },
        status: null,
    } as const;

    export const path = (): string => {
        return `/payments/reservations/get`;
    }
    export const random = (g?: Partial<typia.IRandomGenerator>): Primitive<IPaymentReservation> =>
        typia.random<Primitive<IPaymentReservation>>(g);
    export const simulate = async (
        connection: IConnection,
        input: get.Input,
    ): Promise<Output> => {
        const assert = NestiaSimulator.assert({
            method: METADATA.method,
            host: connection.host,
            path: path(),
            contentType: "text/plain",
        });
        assert.body(() => typia.assert(input));
        return random(
            typeof connection.simulate === 'object' &&
                connection.simulate !== null
                ? connection.simulate
                : undefined
        );
    }
}

/**
 * 간편 결제 수단 조회하기.
 * 
 * @param id Primary Key
 * @param input 비밀번호
 * @returns 간편 결제 수단 정보
 * 
 * @controller PaymentReservationsController.at
 * @path PATCH /payments/reservations/:id
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function at(
    connection: IConnection,
    id: string & Format<"uuid">,
    input: at.Input,
): Promise<at.Output> {
    return !!connection.simulate
        ? at.simulate(
              connection,
              id,
              input,
          )
        : EncryptedFetcher.fetch(
              {
                  ...connection,
                  headers: {
                      ...(connection.headers ?? {}),
                      "Content-Type": "text/plain",
                  },
              },
              {
                  ...at.METADATA,
                  path: at.path(id),
              } as const,
              input,
          );
}
export namespace at {
    export type Input = Primitive<IPaymentSource.IPassword>;
    export type Output = Primitive<IPaymentReservation>;

    export const METADATA = {
        method: "PATCH",
        path: "/payments/reservations/:id",
        request: {
            type: "text/plain",
            encrypted: true
        },
        response: {
            type: "text/plain",
            encrypted: true,
        },
        status: null,
    } as const;

    export const path = (id: string & Format<"uuid">): string => {
        return `/payments/reservations/${encodeURIComponent(id ?? "null")}`;
    }
    export const random = (g?: Partial<typia.IRandomGenerator>): Primitive<IPaymentReservation> =>
        typia.random<Primitive<IPaymentReservation>>(g);
    export const simulate = async (
        connection: IConnection,
        id: string & Format<"uuid">,
        input: at.Input,
    ): Promise<Output> => {
        const assert = NestiaSimulator.assert({
            method: METADATA.method,
            host: connection.host,
            path: path(id),
            contentType: "text/plain",
        });
        assert.param("id")(() => typia.assert(id));
        assert.body(() => typia.assert(input));
        return random(
            typeof connection.simulate === 'object' &&
                connection.simulate !== null
                ? connection.simulate
                : undefined
        );
    }
}

/**
 * 간편 결제 수단 등록하기.
 * 
 * @param input 간편 결제 수단 입력 정보
 * @returns 간편 결제 수단 정보
 * 
 * @controller PaymentReservationsController.store
 * @path POST /payments/reservations
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function store(
    connection: IConnection,
    input: store.Input,
): Promise<store.Output> {
    return !!connection.simulate
        ? store.simulate(
              connection,
              input,
          )
        : EncryptedFetcher.fetch(
              {
                  ...connection,
                  headers: {
                      ...(connection.headers ?? {}),
                      "Content-Type": "text/plain",
                  },
              },
              {
                  ...store.METADATA,
                  path: store.path(),
              } as const,
              input,
          );
}
export namespace store {
    export type Input = Primitive<IPaymentReservation.IStore>;
    export type Output = Primitive<IPaymentReservation>;

    export const METADATA = {
        method: "POST",
        path: "/payments/reservations",
        request: {
            type: "text/plain",
            encrypted: true
        },
        response: {
            type: "text/plain",
            encrypted: true,
        },
        status: null,
    } as const;

    export const path = (): string => {
        return `/payments/reservations`;
    }
    export const random = (g?: Partial<typia.IRandomGenerator>): Primitive<IPaymentReservation> =>
        typia.random<Primitive<IPaymentReservation>>(g);
    export const simulate = async (
        connection: IConnection,
        input: store.Input,
    ): Promise<Output> => {
        const assert = NestiaSimulator.assert({
            method: METADATA.method,
            host: connection.host,
            path: path(),
            contentType: "text/plain",
        });
        assert.body(() => typia.assert(input));
        return random(
            typeof connection.simulate === 'object' &&
                connection.simulate !== null
                ? connection.simulate
                : undefined
        );
    }
}