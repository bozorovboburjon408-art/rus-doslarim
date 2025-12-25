import { Header } from "@/components/Header";
import { notesData, Note } from "@/data/notesData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Languages, FileText, Download } from "lucide-react";
import { toast } from "sonner";
import { Document, Packer, Paragraph, Table as DocxTable, TableRow as DocxTableRow, TableCell as DocxTableCell, TextRun, HeadingLevel, WidthType } from "docx";
import { saveAs } from "file-saver";

const Notes = () => {
  // Lesson 1 has 16 pages from uploaded document
  const lesson1Pages = 16;

  const downloadOriginalDoc = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Fayl yuklab olindi!");
  };

  const downloadWord = async (note: Note) => {
    try {
      // For lesson 1, download the original document
      if (note.id === 1) {
        downloadOriginalDoc('/lessons/lesson1/Amaliy_mashgulot_1.docx', 'Amaliy_mashgulot_1.docx');
        return;
      }

      // For lesson 2, download the original document
      if (note.id === 2) {
        downloadOriginalDoc('/lessons/lesson2/Amaliy_mashgulot_2.docx', 'Amaliy_mashgulot_2.docx');
        return;
      }

      // For lesson 3, download the original document
      if (note.id === 3) {
        downloadOriginalDoc('/lessons/lesson3/Amaliy_mashgulot_3.docx', 'Amaliy_mashgulot_3.docx');
        return;
      }

      // For lesson 4, download the original document
      if (note.id === 4) {
        downloadOriginalDoc('/lessons/lesson4/Amaliy_mashgulot_4.docx', 'Amaliy_mashgulot_4.docx');
        return;
      }

      // For lesson 5, download the original document
      if (note.id === 5) {
        downloadOriginalDoc('/lessons/lesson5/Amaliy_mashgulot_5.docx', 'Amaliy_mashgulot_5.docx');
        return;
      }

      // For lesson 6, download the original document
      if (note.id === 6) {
        downloadOriginalDoc('/lessons/lesson6/Amaliy_mashgulot_6.docx', 'Amaliy_mashgulot_6.docx');
        return;
      }

      // For lesson 7, download the original document
      if (note.id === 7) {
        downloadOriginalDoc('/lessons/lesson7/Amaliy_mashgulot_7.docx', 'Amaliy_mashgulot_7.docx');
        return;
      }

      // For lesson 8, download the original document
      if (note.id === 8) {
        downloadOriginalDoc('/lessons/lesson8/Amaliy_mashgulot_8.docx', 'Amaliy_mashgulot_8.docx');
        return;
      }

      // For lesson 9, download the original document
      if (note.id === 9) {
        downloadOriginalDoc('/lessons/lesson9/Amaliy_mashgulot_9.docx', 'Amaliy_mashgulot_9.docx');
        return;
      }

      // For lesson 10, download the original document
      if (note.id === 10) {
        downloadOriginalDoc('/lessons/lesson10/Amaliy_mashgulot_10.docx', 'Amaliy_mashgulot_10.docx');
        return;
      }

      // For lesson 11, download the original document
      if (note.id === 11) {
        downloadOriginalDoc('/lessons/lesson11/Amaliy_mashgulot_11.docx', 'Amaliy_mashgulot_11.docx');
        return;
      }

      // For lesson 12, download the original document
      if (note.id === 12) {
        downloadOriginalDoc('/lessons/lesson12/Amaliy_mashgulot_12.docx', 'Amaliy_mashgulot_12.docx');
        return;
      }

      // For lesson 13, download the original document
      if (note.id === 13) {
        downloadOriginalDoc('/lessons/lesson13/Amaliy_mashgulot_13.docx', 'Amaliy_mashgulot_13.docx');
        return;
      }

      // For lesson 14, download the original document
      if (note.id === 14) {
        downloadOriginalDoc('/lessons/lesson14/Amaliy_mashgulot_14.docx', 'Amaliy_mashgulot_14.docx');
        return;
      }

      // For lesson 15, download the original document
      if (note.id === 15) {
        downloadOriginalDoc('/lessons/lesson15/Amaliy_mashgulot_15.docx', 'Amaliy_mashgulot_15.docx');
        return;
      }

      // For lesson 16, download the original document
      if (note.id === 16) {
        downloadOriginalDoc('/lessons/lesson16/Amaliy_mashgulot_16.docx', 'Amaliy_mashgulot_16.docx');
        return;
      }

      // For lesson 17, download the original document
      if (note.id === 17) {
        downloadOriginalDoc('/lessons/lesson17/Amaliy_mashgulot_17.docx', 'Amaliy_mashgulot_17.docx');
        return;
      }

      // For lesson 18, download the original document
      if (note.id === 18) {
        downloadOriginalDoc('/lessons/lesson18/Amaliy_mashgulot_18.docx', 'Amaliy_mashgulot_18.docx');
        return;
      }

      // For lesson 19, download the original document
      if (note.id === 19) {
        downloadOriginalDoc('/lessons/lesson19/Amaliy_mashgulot_19.docx', 'Amaliy_mashgulot_19.docx');
        return;
      }

      // For lesson 20, download the original document
      if (note.id === 20) {
        downloadOriginalDoc('/lessons/lesson20/Amaliy_mashgulot_20.docx', 'Amaliy_mashgulot_20.docx');
        return;
      }

      // For lesson 21, download the original document
      if (note.id === 21) {
        downloadOriginalDoc('/lessons/lesson21/Amaliy_mashgulot_21.docx', 'Amaliy_mashgulot_21.docx');
        return;
      }

      // For lesson 22, download the original document
      if (note.id === 22) {
        downloadOriginalDoc('/lessons/lesson22/Amaliy_mashgulot_22.docx', 'Amaliy_mashgulot_22.docx');
        return;
      }

      // For lesson 23, download the original document
      if (note.id === 23) {
        downloadOriginalDoc('/lessons/lesson23/Amaliy_mashgulot_23.docx', 'Amaliy_mashgulot_23.docx');
        return;
      }

      // For lesson 24, download the original document
      if (note.id === 24) {
        downloadOriginalDoc('/lessons/lesson24/Amaliy_mashgulot_24.docx', 'Amaliy_mashgulot_24.docx');
        return;
      }

      toast.info("Word tayyorlanmoqda...");

      // Create vocabulary table
      const vocabRows = [
        new DocxTableRow({
          children: [
            new DocxTableCell({
              children: [new Paragraph({ children: [new TextRun({ text: "Русский", bold: true })] })],
              shading: { fill: "3B82F6" },
            }),
            new DocxTableCell({
              children: [new Paragraph({ children: [new TextRun({ text: "O'zbekcha", bold: true })] })],
              shading: { fill: "3B82F6" },
            }),
          ],
        }),
        ...note.vocabulary.map(
          (item) =>
            new DocxTableRow({
              children: [
                new DocxTableCell({ children: [new Paragraph(item.russian)] }),
                new DocxTableCell({ children: [new Paragraph(item.uzbek)] }),
              ],
            })
        ),
      ];

      // Create grammar table
      const grammarRows = [
        new DocxTableRow({
          children: [
            new DocxTableCell({
              children: [new Paragraph({ children: [new TextRun({ text: "Qoida", bold: true })] })],
              shading: { fill: "22C55E" },
            }),
            new DocxTableCell({
              children: [new Paragraph({ children: [new TextRun({ text: "Misol", bold: true })] })],
              shading: { fill: "22C55E" },
            }),
          ],
        }),
        ...note.grammarRules.map(
          (rule) =>
            new DocxTableRow({
              children: [
                new DocxTableCell({ children: [new Paragraph(rule.rule)] }),
                new DocxTableCell({ children: [new Paragraph({ children: [new TextRun({ text: rule.example, italics: true })] })] }),
              ],
            })
        ),
      ];

      // Create exercises list
      const exerciseParagraphs = note.exercises?.map(
        (exercise, idx) =>
          new Paragraph({
            text: `${idx + 1}. ${exercise}`,
            spacing: { after: 100 },
          })
      ) || [];

      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                text: note.title,
                heading: HeadingLevel.HEADING_1,
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "Grammatika: ", bold: true }),
                  new TextRun(note.grammarTopic),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "Leksika: ", bold: true }),
                  new TextRun(note.lexicalTopic),
                ],
                spacing: { after: 300 },
              }),
              new Paragraph({
                text: "Lug'at / Глоссарий",
                heading: HeadingLevel.HEADING_2,
                spacing: { after: 100 },
              }),
              new DocxTable({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: vocabRows,
              }),
              new Paragraph({ text: "", spacing: { after: 300 } }),
              new Paragraph({
                text: "Grammatik qoidalar / Грамматические правила",
                heading: HeadingLevel.HEADING_2,
                spacing: { after: 100 },
              }),
              new DocxTable({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: grammarRows,
              }),
              new Paragraph({ text: "", spacing: { after: 300 } }),
              new Paragraph({
                text: "Mashqlar / Упражнения",
                heading: HeadingLevel.HEADING_2,
                spacing: { after: 100 },
              }),
              ...exerciseParagraphs,
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const fileName = `konspekt-${note.id}-${note.title.replace(/[^a-zA-Z0-9]/g, "_")}.docx`;
      saveAs(blob, fileName);

      toast.success("Word muvaffaqiyatli yuklandi!");
    } catch (error) {
      console.error("Word yaratishda xatolik:", error);
      toast.error("Word yaratishda xatolik yuz berdi");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Конспекты</h1>
          <p className="text-muted-foreground">24 ta amaliy mashg'ulot – grammatika va leksika</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {notesData.map((note) => (
            <AccordionItem 
              key={note.id} 
              value={`note-${note.id}`}
              className="border rounded-lg px-4 bg-card"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex flex-col items-start gap-2 text-left">
                  <span className="font-semibold text-lg">{note.title}</span>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <BookOpen className="w-3 h-3 mr-1" />
                      {note.grammarTopic}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Languages className="w-3 h-3 mr-1" />
                      {note.lexicalTopic}
                    </Badge>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="grid gap-6">
                  {/* Download Button */}
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => downloadWord(note)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Word yuklab olish
                    </Button>
                  </div>

                  {/* Placeholder for lessons without uploaded document */}
                  {note.id !== 1 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Hujjat yuklanmagan</p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </div>
  );
};

export default Notes;
