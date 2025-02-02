/**
 * @packageDocumentation
 * @module api.functional.certifications
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";

import type { IIamportCertification } from "../../structures/IIamportCertification";
import type { IIamportResponse } from "../../structures/IIamportResponse";

export * as otp from "./otp";

/**
 * 본인인증 정보 열람하기.
 *
 * `certiciations.at` 은 본인인증 정보를 열람할 때 사용하는 API 함수이다.
 *
 * 다만 이 API 함수를 통하여 열람한 본인인증 정보 {@link IIamportCertification } 이
 * 곧 OTP 인증까지 마쳐 본인인증을 모두 마친 레코드라는 보장은 없다. 본인인증의 완결
 * 여부는 오직, {@link IIamportCertification.certified } 값을 직접 검사해봐야만 알
 * 수 있기 때문이다.
 *
 * @param imp_uid 대상 본인인증 정보의 {@link IIamportCertification.imp_uid}
 * @returns 본인인증 정보
 * @security bearer
 * @author Samchon
 *
 * @controller FakeIamportCertificationsController.at
 * @path GET /certifications/:imp_uid
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function at(
  connection: IConnection,
  imp_uid: string,
): Promise<at.Output> {
  return PlainFetcher.fetch(connection, {
    ...at.METADATA,
    path: at.path(imp_uid),
  });
}
export namespace at {
  export type Output = IIamportResponse<IIamportCertification>;

  export const METADATA = {
    method: "GET",
    path: "/certifications/:imp_uid",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = (imp_uid: string) =>
    `/certifications/${encodeURIComponent(imp_uid ?? "null")}`;
}

/**
 * 본인인증 정보 삭제하기.
 *
 * @param imp_uid 대상 본인인증 정보의 {@link IIamportCertification.imp_uid}
 * @returns 삭제된 본인인증 정보
 * @security bearer
 * @author Samchon
 *
 * @controller FakeIamportCertificationsController.erase
 * @path DELETE /certifications/:imp_uid
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function erase(
  connection: IConnection,
  imp_uid: string,
): Promise<erase.Output> {
  return PlainFetcher.fetch(connection, {
    ...erase.METADATA,
    path: erase.path(imp_uid),
  });
}
export namespace erase {
  export type Output = IIamportResponse<IIamportCertification>;

  export const METADATA = {
    method: "DELETE",
    path: "/certifications/:imp_uid",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = (imp_uid: string) =>
    `/certifications/${encodeURIComponent(imp_uid ?? "null")}`;
}
