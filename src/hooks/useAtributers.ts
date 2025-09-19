import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addAttribute,
  getAttributeDetails,
  getAttributerList,
  type Attribute,
  type AttributerResponse,
} from "../services/attributerService";

export const useAttributerList = () =>
  useQuery<AttributerResponse, Error, Attribute[]>({
    queryKey: ["attributerList"],
    queryFn: getAttributerList,
  });

export const useAddAttribute = () =>
  useMutation<Attribute, Error, Attribute>({
    mutationFn: addAttribute,
  });

export const useAttributeDetails = (id: string) =>
  useQuery<Attribute, Error, Attribute>({
    queryKey: ["attributeDetails", id],
    queryFn: () => getAttributeDetails(id),
    enabled: !!id,
  });
