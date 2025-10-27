import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormData, WorkExperience } from "@/lib/types/persona.types";
import { Trash } from "iconsax-reactjs";
import { Plus } from "lucide-react";

export default function CreatePersonaWorkExperience({
  pushToArray,
  formData,
  removeFromArray,
  updateArrayAt,
}: {
  pushToArray: <T, K extends keyof FormData>(field: K, item: T) => void;
  formData: FormData;
  removeFromArray: <K extends keyof FormData>(field: K, index: number) => void;
  updateArrayAt: <T, K extends keyof FormData>(
    field: K,
    index: number,
    updater: (item: any) => any,
  ) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Work Experience</Label>
        <Button
          size="sm"
          variant="ghost"
          type="button"
          onClick={() =>
            pushToArray<WorkExperience, "workExperience">("workExperience", {
              company: "",
              position: "",
              startDate: "",
              endDate: "",
              highlights: "",
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" /> Add
        </Button>
      </div>

      {formData.workExperience.map((work, i) => (
        <div
          key={i}
          className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 bg-neutral-50 dark:bg-neutral-800 space-y-3"
        >
          <div className="flex justify-between">
            <Label className="text-sm">{work.position || "New role"}</Label>
            <div className="flex gap-2">
              {formData.workExperience.length > 1 && (
                <Button
                  size="sm"
                  variant="ghost"
                  type="button"
                  onClick={() => removeFromArray("workExperience", i)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              placeholder="Company"
              value={work.company}
              onChange={(e) =>
                updateArrayAt<WorkExperience, "workExperience">(
                  "workExperience",
                  i,
                  (x) => ({ ...x, company: e.target.value }),
                )
              }
            />
            <Input
              placeholder="Position"
              value={work.position}
              onChange={(e) =>
                updateArrayAt<WorkExperience, "workExperience">(
                  "workExperience",
                  i,
                  (x) => ({ ...x, position: e.target.value }),
                )
              }
            />
            <Input
              placeholder="Start (YYYY-MM)"
              value={work.startDate}
              onChange={(e) =>
                updateArrayAt<WorkExperience, "workExperience">(
                  "workExperience",
                  i,
                  (x) => ({ ...x, startDate: e.target.value }),
                )
              }
            />
            <Input
              placeholder="End (YYYY-MM or Present)"
              value={work.endDate}
              onChange={(e) =>
                updateArrayAt<WorkExperience, "workExperience">(
                  "workExperience",
                  i,
                  (x) => ({ ...x, endDate: e.target.value }),
                )
              }
            />
            <Textarea
              placeholder="Highlights (comma or newline separated)"
              rows={2}
              value={work.highlights}
              onChange={(e) =>
                updateArrayAt<WorkExperience, "workExperience">(
                  "workExperience",
                  i,
                  (x) => ({ ...x, highlights: e.target.value }),
                )
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}
