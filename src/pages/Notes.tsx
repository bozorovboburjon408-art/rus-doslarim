import { Header } from "@/components/Header";
import { notesData, Note } from "@/data/notesData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Languages, GraduationCap, PenLine, Download } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Notes = () => {
  const downloadPDF = (note: Note) => {
    try {
      const doc = new jsPDF();
      
      // Title
      doc.setFontSize(18);
      doc.text(note.title, 14, 20);
      
      // Topics
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Grammatika: ${note.grammarTopic}`, 14, 30);
      doc.text(`Leksika: ${note.lexicalTopic}`, 14, 38);
      
      let yPosition = 50;
      
      // Vocabulary Table
      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text("Lug'at / Glossariy", 14, yPosition);
      yPosition += 5;
      
      autoTable(doc, {
        startY: yPosition,
        head: [["Russkiy", "O'zbekcha"]],
        body: note.vocabulary.map(item => [item.russian, item.uzbek]),
        styles: { fontSize: 10 },
        headStyles: { fillColor: [59, 130, 246] },
        margin: { left: 14, right: 14 },
      });
      
      yPosition = (doc as any).lastAutoTable.finalY + 15;
      
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Grammar Rules Table
      doc.setFontSize(14);
      doc.text("Grammatik qoidalar", 14, yPosition);
      yPosition += 5;
      
      autoTable(doc, {
        startY: yPosition,
        head: [["Qoida", "Misol"]],
        body: note.grammarRules.map(rule => [rule.rule, rule.example]),
        styles: { fontSize: 10 },
        headStyles: { fillColor: [34, 197, 94] },
        margin: { left: 14, right: 14 },
        columnStyles: {
          0: { cellWidth: 90 },
          1: { cellWidth: 80, fontStyle: 'italic' },
        },
      });
      
      yPosition = (doc as any).lastAutoTable.finalY + 15;
      
      // Exercises
      if (note.exercises && note.exercises.length > 0) {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(14);
        doc.text("Mashqlar", 14, yPosition);
        yPosition += 8;
        
        doc.setFontSize(10);
        note.exercises.forEach((exercise, idx) => {
          if (yPosition > 280) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(`${idx + 1}. ${exercise}`, 14, yPosition);
          yPosition += 7;
        });
      }
      
      // Save PDF
      const fileName = `konspekt-${note.id}-${note.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      doc.save(fileName);
      
      toast.success("PDF muvaffaqiyatli yuklandi!");
    } catch (error) {
      console.error("PDF yaratishda xatolik:", error);
      toast.error("PDF yaratishda xatolik yuz berdi");
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
                      onClick={() => downloadPDF(note)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      PDF yuklab olish
                    </Button>
                  </div>

                  {/* Vocabulary Table */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Languages className="w-4 h-4" />
                        Lug'at / Глоссарий
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-1/2">Русский</TableHead>
                            <TableHead className="w-1/2">O'zbekcha</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {note.vocabulary.map((item, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{item.russian}</TableCell>
                              <TableCell>{item.uzbek}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Grammar Rules Table */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Grammatik qoidalar / Грамматические правила
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-1/2">Qoida / Правило</TableHead>
                            <TableHead className="w-1/2">Misol / Пример</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {note.grammarRules.map((rule, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{rule.rule}</TableCell>
                              <TableCell className="italic text-muted-foreground">{rule.example}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Exercises */}
                  {note.exercises && note.exercises.length > 0 && (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <PenLine className="w-4 h-4" />
                          Mashqlar / Упражнения
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside space-y-2">
                          {note.exercises.map((exercise, idx) => (
                            <li key={idx} className="text-muted-foreground">{exercise}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
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
