/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */

"use client";
import { IDoctor } from "@/types/doctor.interface";
import { ISpecialty } from "@/types/specialty.interface";

import { useEffect, useState } from "react";

interface IUseSpecialtySelectionProps {
  doctor?: IDoctor;
  isEdit: boolean;
  open: boolean;
}

interface IUseSpecialtySelectionReturn {
  selectedSpecialtyIds: string[];
  removedSpecialtyIds: string[];
  currentSpecialtyId: string;
  setCurrentSpecialtyId: (id: string) => void;
  handleAddSpecialty: () => void;
  handleRemoveSpecialty: (id: string) => void;
  getNewSpecialties: () => string[];
  getAvailableSpecialties: (allSpecialties: ISpecialty[]) => ISpecialty[];
}

const useSpecialtySelection = ({
  doctor,
  isEdit,
  open,
}: IUseSpecialtySelectionProps): IUseSpecialtySelectionReturn => {
  const getInitialSpecialtyIds = () => {
    if (isEdit && doctor?.doctorSpecialties) {
      return (
        doctor.doctorSpecialties
          ?.map((ds) => {
            return ds.specialtiesId || null;
          })
          ?.filter((sId): sId is string => !!sId) || []
      );
    }
    return [];
  };
  const [selectedSpecialtyIds, setSelectedSpecialtyIds] = useState<string[]>(
    getInitialSpecialtyIds
  );
  const [removedSpecialtyIds, setRemovedSpecialtyIds] = useState<string[]>([]);
  const [currentSpecialtyId, setCurrentSpecialtyId] = useState<string>("");

  const handleAddSpecialty = () => {
    if (
      currentSpecialtyId &&
      !selectedSpecialtyIds.includes(currentSpecialtyId)
    ) {
      setSelectedSpecialtyIds([...selectedSpecialtyIds, currentSpecialtyId]);
      if (removedSpecialtyIds.includes(currentSpecialtyId)) {
        setRemovedSpecialtyIds(
          removedSpecialtyIds?.filter(
            (removeSpecialtyId) => removeSpecialtyId !== currentSpecialtyId
          )
        );
      }
      setCurrentSpecialtyId("");
    }
  };

  const handleRemoveSpecialty = (specialtyId: string) => {
    setSelectedSpecialtyIds(
      selectedSpecialtyIds?.filter(
        (selectedSpecialtyId) => selectedSpecialtyId !== specialtyId
      )
    );
    if (isEdit && doctor?.doctorSpecialties) {
      const wasOriginalSpecialty = doctor?.doctorSpecialties?.some((ds) => {
        const id = ds.specialtiesId || null;
        return id === specialtyId;
      });
      if (wasOriginalSpecialty && !removedSpecialtyIds.includes(specialtyId)) {
        setRemovedSpecialtyIds([...removedSpecialtyIds, specialtyId]);
      }
    }
  };
  const getNewSpecialties = () => {
    if (!isEdit && !doctor?.doctorSpecialties) {
      return selectedSpecialtyIds;
    }
    const originalIds =
      doctor?.doctorSpecialties
        ?.map((ds) => ds?.specialtiesId || null)
        ?.filter((id): id is string => !!id) || [];
    return selectedSpecialtyIds?.filter(
      (selectedId) => !originalIds.includes(selectedId)
    );
  };

  const getAvailableSpecialties = (allSpecialties: ISpecialty[]) => {
    return (
      allSpecialties?.filter(
        (specialty) => !selectedSpecialtyIds.includes(specialty?.id)
      ) || []
    );
  };
  useEffect(() => {
    if (open && doctor) {
      const initialIds = getInitialSpecialtyIds();
      setSelectedSpecialtyIds(initialIds);
      setRemovedSpecialtyIds([]);
      setCurrentSpecialtyId("");
    }
  }, [open, doctor?.id]);

  return {
    selectedSpecialtyIds,
    removedSpecialtyIds,
    currentSpecialtyId,
    setCurrentSpecialtyId,
    handleAddSpecialty,
    handleRemoveSpecialty,
    getNewSpecialties,
    getAvailableSpecialties,
  };
};

export default useSpecialtySelection;
