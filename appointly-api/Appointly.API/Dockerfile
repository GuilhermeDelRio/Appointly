FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Appointly.API/Appointly.API.csproj", "Appointly.API/"]
COPY ["Appointly.Application/Appointly.Application.csproj", "Appointly.Application/"]
COPY ["Appointly.Domain/Appointly.Domain.csproj", "Appointly.Domain/"]
COPY ["Appointly.Persistence/Appointly.Persistence.csproj", "Appointly.Persistence/"]
RUN dotnet restore "Appointly.API/Appointly.API.csproj"
COPY . .
WORKDIR "/src/Appointly.API"
RUN dotnet build "Appointly.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Appointly.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Appointly.API.dll"]
