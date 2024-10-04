import { useEffect, useState, useRef } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
import CheckList from "../../../components/CheckList";
import RadioList from "../../../components/RadioList";
import { useFormikContext } from "formik";

export default function DemographicForm() {
  const {
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    setFieldTouched,
  } = useFormikContext();
  return (
    <Stack gap={"var(--field-gap)"}>
      <FormLabel>
        Para garantizar que su evento alcance su máximo potencial y cuente con
        el respaldo adecuado, le solicitamos algunos detalles adicionales sobre
        la audiencia y los temas de su evento. Esta información nos permitirá
        alinear mejor los recursos y los esfuerzos de divulgación, asegurando la
        atención y asistencia adecuadas para el éxito de su evento.
      </FormLabel>

      <CheckList
        label={"Programas educativos"}
        selectAll
        values={values.programs}
        error={Boolean(errors.programs && touched.programs)}
        helperText={touched.programs && errors.programs}
        name={"programs"}
        onChange={(checked) => {
          setFieldTouched("programs");
          setFieldValue("programs", checked);
        }}
      >
        <Typography value={1}>
          Doctorado en Ciencias de la Computación
        </Typography>
        <Typography value={2}>
          Especialización en Métodos Estadísticos
        </Typography>
        <Typography value={3}>
          Estadística - Ingeniería en Ciencia de Datos
        </Typography>
        <Typography value={4}>Ingeniería de Software</Typography>
        <Typography value={5}>Maestría en Gestión de Calidad</Typography>
        <Typography value={6}>
          Maestría en Sistemas Interactivos Centrados en el Usuario
        </Typography>
        <Typography value={7}>
          Redes y Servicios de Cómputo - Ingeniería en Civerseguridad e
          Infrastructura de Cómputo
        </Typography>
        <Typography value={8}>
          Tecnologías Computacionales - Ingeniería en Sistemas y Tecnologías de
          la Información
        </Typography>
      </CheckList>

      <CheckList
        label={"Audiencias"}
        selectAll
        values={values.audiences}
        name={"audiences"}
        error={Boolean(errors.audiences && touched.audiences)}
        helperText={touched.audiences && errors.audiences}
        onChange={(checked) => {
          setFieldTouched("audiences");
          setFieldValue("audiences", checked);
        }}
      >
        <Typography value={"Estudiantes"}>Estudiantes</Typography>
        <Typography value={"Académicos"}>Académicos</Typography>
        <Typography value={"Personal administrativo"}>
          Personal administrativo
        </Typography>
        <Typography value={"Público en general"}>Público en general</Typography>
      </CheckList>

      <RadioList
        label={"Tipo de evento"}
        id={"radio-list-event-type"}
        value={values.idTipo}
        name={"idTipo"}
        error={Boolean(errors.idTipo && touched.idTipo)}
        helperText={touched.idTipo && errors.idTipo}
        onChange={(e) => {
          setFieldTouched("idtipo");
          setFieldValue("idTipo", e.target.value);
        }}
      >
        <Typography value={1}>Académico</Typography>
        <Typography value={2}>Cultural</Typography>
        <Typography value={3}>Deportivo</Typography>
        <Typography value={4}>Mixto</Typography>
      </RadioList>
      <RadioList
        label={"Ámbito"}
        id={"radio-list-scope"}
        value={values.scope}
        name={"scope"}
        error={Boolean(errors.scope && touched.scope)}
        helperText={touched.scope && errors.scope}
        onChange={(e) => {
          setFieldTouched("scope");
          setFieldValue("scope", e.target.value);
        }}
      >
        <Typography value={"Local/Regional"}>Local/Regional</Typography>
        <Typography value={"Estatal"}>Estatal</Typography>
        <Typography value={"Nacional"}>Nacional</Typography>
        <Typography value={"Internacional"}>Internacional</Typography>
      </RadioList>

      <RadioList
        label={"Éje del Programa de Trabajo al que impacta"}
        id={"radio-list-axis"}
        value={values.axis}
        name={"axis"}
        error={Boolean(errors.axis && touched.axis)}
        helperText={touched.axis && errors.axis}
        onChange={(e) => {
          setFieldTouched("axis");
          setFieldValue("axis", e.target.value);
        }}
      >
        <Typography value={"Derechos Humanos"}>Derechos Humanos</Typography>
        <Typography value={"Sustentabilidad"}>Sustentabilidad</Typography>
        <Typography value={"Docencia e innovación académica"}>
          Docencia e innovación académica
        </Typography>
        <Typography value={"Investigación e innovación"}>
          Investigación e innovación
        </Typography>
        <Typography
          value={"Difusión de la cultura y extensión de los servicios"}
        >
          Difusión de la cultura y extensión de los servicios
        </Typography>
      </RadioList>

      <CheckList
        label={"Temáticas principales (mínimo 1, máximo 3)"}
        max={3}
        values={values.themes}
        name={"themes"}
        error={Boolean(errors.themes && touched.themes)}
        helperText={touched.themes && errors.themes}
        onChange={(checked) => {
          setFieldTouched("themes");
          setFieldValue("themes", checked);
        }}
      >
        <Typography value={"Biodiversidad e integridad ecosistémica"}>
          Biodiversidad e integridad ecosistémica
        </Typography>
        <Typography value={"Calidad ambiental y gestión de campus"}>
          Calidad ambiental y gestión de campus
        </Typography>
        <Typography
          value={
            "Cultura de paz/Erradicación de la violencia/Integridad académica"
          }
        >
          Cultura de paz/Erradicación de la violencia/Integridad académica{" "}
        </Typography>
        <Typography value={"Difusión de la oferta educativa"}>
          Difusión de la oferta educativa
        </Typography>
        <Typography value={"Derechos humanos"}>Derechos humanos</Typography>
        <Typography value={"Disciplinar"}>Disciplinar</Typography>
        <Typography value={"Estilos de vida y patrones de consumo"}>
          Estilos de vida y patrones de consumo
        </Typography>
        <Typography value={"Equidad de género y diversidad sexual"}>
          Equidad de género y diversidad sexual
        </Typography>
        <Typography value={"Interculturalidad"}>Interculturalidad</Typography>
        <Typography value={"Salud y deporte"}>Salud y deporte</Typography>
      </CheckList>
    </Stack>
  );
}
