"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Activity } from "lucide-react"

interface BMIResult {
  bmi: number
  category: string
  color: string
  description: string
}

export function BMICalculator() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [result, setResult] = useState<BMIResult | null>(null)

  const calculateBMI = () => {
    const weightNum = Number.parseFloat(weight)
    const heightNum = Number.parseFloat(height)

    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
      return
    }

    // Convert height to meters if it seems to be in cm
    const heightInMeters = heightNum > 3 ? heightNum / 100 : heightNum
    const bmi = weightNum / (heightInMeters * heightInMeters)

    let category = ""
    let color = ""
    let description = ""

    if (bmi < 18.5) {
      category = "Abaixo do Peso"
      color = "text-blue-600"
      description = "Seu IMC indica que você está abaixo do peso ideal. Considere consultar um nutricionista."
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Peso Normal"
      color = "text-primary"
      description = "Parabéns! Seu IMC está na faixa saudável. Continue mantendo hábitos saudáveis."
    } else if (bmi >= 25 && bmi < 30) {
      category = "Sobrepeso"
      color = "text-yellow-600"
      description = "Seu IMC indica sobrepeso. Exercícios regulares e alimentação equilibrada podem ajudar."
    } else if (bmi >= 30 && bmi < 35) {
      category = "Obesidade Grau I"
      color = "text-orange-600"
      description = "Seu IMC indica obesidade grau I. Procure orientação médica e nutricional."
    } else if (bmi >= 35 && bmi < 40) {
      category = "Obesidade Grau II"
      color = "text-red-600"
      description = "Seu IMC indica obesidade grau II. É importante buscar acompanhamento profissional."
    } else {
      category = "Obesidade Grau III"
      color = "text-red-700"
      description = "Seu IMC indica obesidade grau III. Procure ajuda médica especializada com urgência."
    }

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      color,
      description,
    })
  }

  const handleReset = () => {
    setWeight("")
    setHeight("")
    setResult(null)
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Activity className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Calculadora de IMC</h1>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Calcule seu Índice de Massa Corporal e descubra se seu peso está adequado para sua altura
          </p>
        </div>

        {/* Calculator Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Seus Dados</CardTitle>
            <CardDescription>Preencha as informações abaixo para calcular seu IMC</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Weight Input */}
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-base">
                  Peso (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Ex: 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="text-lg h-12"
                  step="0.1"
                  min="0"
                />
              </div>

              {/* Height Input */}
              <div className="space-y-2">
                <Label htmlFor="height" className="text-base">
                  Altura (m ou cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Ex: 1.75 ou 175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="text-lg h-12"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={calculateBMI} className="flex-1 h-12 text-base" size="lg">
                Calcular IMC
              </Button>
              <Button onClick={handleReset} variant="outline" className="h-12 text-base bg-transparent" size="lg">
                Limpar
              </Button>
            </div>

            {/* Result */}
            {result && (
              <div className="mt-8 p-6 bg-secondary rounded-lg border-2 border-border animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-4">
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">Seu IMC é</p>
                    <p className={`text-6xl font-bold ${result.color}`}>{result.bmi}</p>
                  </div>
                  <div>
                    <p className={`text-2xl font-semibold ${result.color} mb-2`}>{result.category}</p>
                    <p className="text-muted-foreground text-base max-w-md mx-auto text-pretty">{result.description}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">O que é IMC?</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              O Índice de Massa Corporal (IMC) é uma medida internacional usada para calcular se uma pessoa está no peso
              ideal. Ele é calculado dividindo o peso pela altura ao quadrado.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Classificação do IMC</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Abaixo de 18,5</span>
                <span className="font-medium text-blue-600">Abaixo do Peso</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">18,5 - 24,9</span>
                <span className="font-medium text-primary">Peso Normal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">25,0 - 29,9</span>
                <span className="font-medium text-yellow-600">Sobrepeso</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">30,0 - 34,9</span>
                <span className="font-medium text-orange-600">Obesidade I</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">35,0 - 39,9</span>
                <span className="font-medium text-red-600">Obesidade II</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Acima de 40</span>
                <span className="font-medium text-red-700">Obesidade III</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
