import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { PenilaianRisikoResponse } from '@/services/penilaianRisiko/types';
import ActionDropdown from '@/components/common/ActionDropdown';

interface RiskAssessmentCardsProps {
  data: PenilaianRisikoResponse[];
  loading?: boolean;
  onView?: (item: PenilaianRisikoResponse) => void;
  onEdit?: (item: PenilaianRisikoResponse) => void;
  onDelete?: (item: PenilaianRisikoResponse) => void;
  canEdit?: (item: PenilaianRisikoResponse) => boolean;
  currentPage?: number;
  itemsPerPage?: number;
}

const RiskAssessmentCards: React.FC<RiskAssessmentCardsProps> = ({
  data,
  loading = false,
  onView,
  onEdit,
  onDelete,
  canEdit = () => true,
  currentPage = 1,
  itemsPerPage = 10,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className="w-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-8 w-24" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div>
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-8 mt-1" />
                </div>
                <div>
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12 mt-1" />
                </div>
                <div>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24 mt-1" />
                </div>
                <div>
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-16 mt-1" />
                </div>
                <div className="col-span-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground">
        Tidak ada data yang ditemukan.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {data.map((item, index) => (
        <Card key={item.id} className="w-full gap-0">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-semibold">
                {item.nama_perwadag}
              </CardTitle>
              <ActionDropdown
                onView={() => onView?.(item)}
                onEdit={canEdit(item) ? () => onEdit?.(item) : undefined}
                onDelete={canEdit(item) ? () => onDelete?.(item) : undefined}
              />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col gap-3 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">No:</span>
                <span className="ml-2">{(currentPage - 1) * itemsPerPage + index + 1}</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Tahun:</span>
                <span className="ml-2">{item.tahun}</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Inspektorat:</span>
                <span className="ml-2">{item.inspektorat}</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Skor:</span>
                <span className="ml-2">{item.total_nilai_risiko ? Number(item.total_nilai_risiko).toFixed(1) : '-'}</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Status Penilaian Risiko:</span>
                <span className="ml-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.total_nilai_risiko !== null
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                    }`}>
                    {item.total_nilai_risiko !== null ? 'Lengkap' : 'Belum Lengkap'}
                  </span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RiskAssessmentCards;