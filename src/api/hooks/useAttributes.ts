import { useMutation, useQuery } from "@tanstack/react-query";
import { attributeEndpoints } from "../endpoints/attributes";
import { queryKeys } from "../../lib/queryKeys";
import type { Attribute } from "../types";

export const useAttributerList = () =>
  useQuery<Attribute[], Error, Attribute[]>({
    queryKey: queryKeys.attributes.list(),
    queryFn: attributeEndpoints.getAttributes,
  });

export const useAddAttribute = () =>
  useMutation<Attribute, Error, Omit<Attribute, "_id" | "id">>({
    mutationFn: attributeEndpoints.createAttribute,
  });

export const useAttributeDetails = (id: string) =>
  useQuery<Attribute, Error, Attribute>({
    queryKey: queryKeys.attributes.detail(id),
    queryFn: () => attributeEndpoints.getAttribute(id),
    enabled: !!id,
  });

